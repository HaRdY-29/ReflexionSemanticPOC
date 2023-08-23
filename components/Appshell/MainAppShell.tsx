"use client";

import { AppShell, Group, Title, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import classes from "./MantineAppShell.module.css";
import ColorSwitch from "./ColorSwitch";
import { IconSearch, IconVideo } from "@tabler/icons-react";
import "@mantine/dropzone/styles.css";

const data = [
  {
    icon: IconVideo,
    label: "Videos",
    to: "/videos",
  },
  {
    icon: IconSearch,
    label: "Search",
    to: "/search",
  },
];

export default function MainAppShell({ children }: { children: any }) {
  const router = useRouter();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      label={item.label}
      leftSection={<item.icon size="1.4rem" />}
      component={Link}
      href={item.to}
    />
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      className={classes.mainbg}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Title
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/")}
            >
              Reflexion LLM
            </Title>
          </Group>
          <Group mr="lg">
            {/* <NotificationMenu /> */}
            {/* <ProfileMenu /> */}
            <ColorSwitch />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">{items}</AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
