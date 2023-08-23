"use client";
import {
  Card,
  Group,
  Badge,
  Button,
  SimpleGrid,
  Kbd,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Page = () => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["indexes"],
    queryFn: () =>
      axios.get("http://localhost:5112/api/Task/Index").then((res) => res.data),
  });

  const cards = data?.map((item: any, index: any) => (
    <Card key={index} shadow="sm" padding="md" radius="md" withBorder>
      <Group justify="space-between" mb="md">
        <Title order={3}>{item?.indexName}</Title>
        <Badge color="pink" variant="light">
          {item?.engineId}
        </Badge>
      </Group>
      <SimpleGrid cols={2}>
        {JSON.parse(item?.indexoptions).map((opt: any, i: any) => (
          <Kbd style={{ textTransform: "uppercase" }} key={i}>
            {opt}
          </Kbd>
        ))}
      </SimpleGrid>
      <Button
        variant="light"
        color="green"
        fullWidth
        mt="md"
        radius="md"
        component="a"
        href={`/search/${item?.indexName}`}
      >
        Search
      </Button>
      <Button variant="transparent" mt="md">
        Upload More
      </Button>
    </Card>
  ));
  return (
    <div>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }}>{cards}</SimpleGrid>
    </div>
  );
};

export default Page;
