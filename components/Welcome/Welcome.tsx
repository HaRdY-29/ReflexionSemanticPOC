import { Title, Text } from "@mantine/core";
import classes from "./Welcome.module.css";

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome{" "}
        {/* <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Aniket Dhare
        </Text> */}
      </Title>
    </>
  );
}
