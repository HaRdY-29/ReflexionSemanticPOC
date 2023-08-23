"use client";
import { useState } from "react";
import {
  Group,
  Title,
  rem,
  Text,
  Paper,
  SimpleGrid,
  Image,
} from "@mantine/core";
import {
  Dropzone,
  DropzoneProps,
  MIME_TYPES,
  IMAGE_MIME_TYPE,
  FileWithPath,
} from "@mantine/dropzone";
import { IconUpload, IconX, IconPhoto } from "@tabler/icons-react";

export default function Upload() {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        alt=""
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  return (
    <div>
      <Title mb={"md"}>Upload Video</Title>
      <Paper shadow="md" p="xs">
        <Dropzone
          onDrop={(files) => {
            console.log("accepted files", files);
            setFiles;
          }}
          onReject={(files) => console.log("rejected files", files)}
          //maxSize={3 * 1024 ** 2}
          accept={[MIME_TYPES.mp4, ...IMAGE_MIME_TYPE]}
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
                Drag Videos here or click to select files
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Attach as many files as you like
              </Text>
            </div>
          </Group>
        </Dropzone>
      </Paper>

      <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? "xl" : 0}>
        {previews}
      </SimpleGrid>
    </div>
  );
}
