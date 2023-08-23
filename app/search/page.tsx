"use client";
import {
  Divider,
  Input,
  Title,
  Grid,
  Card,
  Text,
  SimpleGrid,
  TextInput,
  Group,
  Badge,
  Kbd,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "@vime/core/themes/default.css";
import { Player, Ui, Hls } from "@vime/react";

function fancyTimeFormat(duration: number) {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;

  return ret;
}

export default function Page() {
  const form = useForm({
    initialValues: {
      query: "",
      search_options: ["conversation", "visual"],
    },
    validate: {
      query: (value) =>
        value.length < 2 ? "Search must have at least 2 letters" : null,
    },
  });
  const hlsConfig = {
    // ...
  };
  const { data, refetch } = useQuery({
    queryKey: ["Searchvideos"],
    enabled: false,
    queryFn: () =>
      axios
        .post(`http://localhost:5112/api/Task/search`, form.values)
        .then((res) => res.data),
  });
  const cards = data?.data?.map((item: any, index: any) => (
    <Card key={index} shadow="sm" padding="md" radius="md" withBorder>
      <Player controls>
        <Hls version="latest" config={hlsConfig} poster={item?.thumbnail_url}>
          <source
            data-src={`${item?.hls_blob_url}#t=${item?.start}s`}
            type="application/x-mpegURL"
          />
        </Hls>
        <Ui></Ui>
      </Player>
      <Group justify="space-between" my={"md"}>
        <Group>
          {item?.metadata.map((type: any, i: any) => (
            <Kbd key={item?.start}>{type.type}</Kbd>
          ))}
        </Group>
        <Badge variant="light" color="cyan">
          Confidence : {parseInt(item?.score)}%
        </Badge>
      </Group>
      <Group justify="space-between">
        <Group>
          <Text>Start : </Text>{" "}
          <Badge variant="light" color="teal" radius="sm">
            {fancyTimeFormat(item?.start)} Mins
          </Badge>
        </Group>
        <Group>
          <Text>End : </Text>{" "}
          <Badge variant="light" color="teal" radius="sm">
            {fancyTimeFormat(item?.end)} Mins
          </Badge>
        </Group>
        {/* <Text>End : {fancyTimeFormat(item?.end)} Mins</Text> */}
      </Group>
      <Text mt={"lg"}>{item?.videoName}</Text>
    </Card>
  ));

  const handleformSubmit = (values: any) => {
    console.log(values);
    refetch(values);
  };

  return (
    <div>
      <Title mb={"md"}>Search :</Title>
      <Grid align="center">
        <Grid.Col span={6}>
          <form onSubmit={form.onSubmit((values) => handleformSubmit(values))}>
            <Input.Wrapper
              label="What are you looking for ?"
              mb={"lg"}
              size="lg"
            >
              <TextInput
                leftSection={<IconSearch />}
                placeholder="Search"
                {...form.getInputProps("query")}
              />
            </Input.Wrapper>
          </form>
        </Grid.Col>
        <Grid.Col span={2}>
          {/* <Button
            variant="filled"
            type="submit"
            color="blue"
            mt={"0.5rem"}
            leftSection={<IconSearch />}
          >
            Search
          </Button> */}
        </Grid.Col>
      </Grid>
      <Divider mb={"lg"}></Divider>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>{cards}</SimpleGrid>
    </div>
  );
}
