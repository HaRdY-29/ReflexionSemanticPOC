"use client";
import {
  Card,
  Divider,
  Title,
  Text,
  SimpleGrid,
  Group,
  Button,
  Image,
  rem,
  Modal,
  LoadingOverlay,
  Badge,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconPhoto,
  IconUpload,
  IconVideoPlus,
  IconX,
} from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [keepFetching, setkeepFetching] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ["allvideos"],
    queryFn: () =>
      axios
        .get(`http://localhost:5112/api/Task/VideoTaks`)
        .then((res) => res.data),
  });

  useEffect(() => {
    var isnotreadylist = data?.filter((v: any) => v?.is_ready == false);
    if (isnotreadylist?.length > 0) {
      setkeepFetching(true);
    } else {
      setkeepFetching(false);
    }
  }, [data]);

  const { data: statuscheck } = useQuery({
    queryKey: ["status check"],
    enabled: keepFetching,
    refetchInterval: 10000,
    queryFn: () =>
      axios
        .get(`http://localhost:5112/api/Task/videos/checkstatus`)
        .then((res) => res.data),
  });
  useEffect(() => {
    if (statuscheck) {
      refetch();
    }
  }, [statuscheck, refetch]);
  const mutation = useMutation({
    mutationFn: (file: File) => {
      var bodyFormData = new FormData();
      bodyFormData.append("file", file);
      return axios.post("http://localhost:5112/api/Task/upload", bodyFormData);
    },
    onSuccess: (data, variables, context) => {
      close();
      refetch();
      notifications.show({
        title: "We notify you that",
        color: "green",
        autoClose: 5000,
        message: "Video upload task started",
      });
    },
  });

  const cards = data?.map((item: any, index: any) => (
    <Card key={index} shadow="sm" padding="md" radius="md" withBorder>
      <Image
        src={
          item?.thumbnailUrl == null
            ? "https://rfxllm.blob.core.windows.net/uploads/pngegg.png"
            : item?.thumbnailUrl
        }
        alt={item?.fileName}
        height={200}
        fit="contain"
        placeholder="https://rfxllm.blob.core.windows.net/uploads/pngegg.png"
      />
      {/* <video src={`${item?.videoBlobUrl}`} /> */}
      <Group mt={"lg"} justify="space-between">
        {item?.status == null ? (
          <></>
        ) : (
          <Badge style={{ textTransform: "uppercase" }}>{item?.status}</Badge>
        )}
        {item?.is_ready == false ? <Badge color="red">Not Ready</Badge> : <></>}
      </Group>
      <Text mt={"md"}>{item?.fileName}</Text>
    </Card>
  ));
  const [file, setFile] = useState<File | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const clearFile = () => {
    setFile(null);
  };

  const UploadLogic = () => {
    mutation.mutate(file!);
  };
  return (
    <>
      <Modal
        pos={"relative"}
        opened={opened}
        onClose={close}
        title="Upload Video"
        size={"xl"}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <>
          <LoadingOverlay
            visible={mutation?.isLoading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <Dropzone
            //openRef={props.resetRef}
            onDrop={(files) => {
              setFile(files[0]);
            }}
            onReject={(files) => console.log("rejected files", files)}
            //maxSize={3 * 1024 ** 2}
            accept={[MIME_TYPES.mp4]}
            multiple={false}
          >
            <Group
              justify="center"
              gap="xl"
              mih={220}
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
          <Group mt="md">
            <Button
              disabled={!file}
              onClick={UploadLogic}
              variant="light"
              color="green"
              leftSection={<IconVideoPlus />}
            >
              Upload
            </Button>
            <Button disabled={!file} color="red" onClick={clearFile}>
              Reset
            </Button>
            {file && (
              <Text size="sm" ta="center" mt="sm">
                Picked file: {file.name}
              </Text>
            )}
          </Group>
        </>
      </Modal>

      <Group align="center">
        <Title mb={"md"}>Videos</Title>
        <Group>
          <Button
            variant="light"
            color="green"
            leftSection={<IconUpload size={"1rem"} />}
            onClick={open}
          >
            Upload Video
          </Button>
        </Group>
      </Group>
      <Divider mb={"lg"}></Divider>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>{cards}</SimpleGrid>
    </>
  );
};

export default Page;
