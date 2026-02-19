import {
  Heading,
  Text,
  Button,
  Avatar,
  Card,
  Column,
  Badge,
  Icon,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";
import { ContactCard } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import { FadeContent } from "@/components/FadeContent";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="0" paddingY="0" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column
        fillWidth
        horizontal="center"
        gap="m"
        paddingTop="4"
        paddingBottom="12"
        style={{ minHeight: "calc(100vh - 80px)", display: "flex", justifyContent: "center" }}
      >
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <FadeContent
              delay={0}
              duration={2000}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingTop: "16px",
                paddingBottom: "32px",
                paddingLeft: "12px",
              }}
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </FadeContent>
          )}
          <FadeContent delay={0.15} duration={2000} style={{ width: "100%", paddingBottom: "16px" }}>
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </FadeContent>
          <FadeContent delay={0.3} duration={2000} style={{ width: "100%", paddingBottom: "32px" }}>
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </FadeContent>
          <FadeContent delay={0.5} duration={2000} style={{ paddingTop: "12px", paddingLeft: "12px" }}>
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Row>
            </Button>
          </FadeContent>
        </Column>
      </Column>
      {routes["/work"] && (
        <Column
          fillWidth
          paddingY="12"
          style={{ minHeight: "100vh", display: "flex", justifyContent: "center" }}
        >
          <FadeContent delay={0.1} duration={2000} blur style={{ width: "100%" }}>
            <Projects range={[1, 1]} />
          </FadeContent>
        </Column>
      )}
      <Column
        fillWidth
        paddingTop="12"
        paddingBottom="8"
        style={{ minHeight: "100vh", display: "flex", justifyContent: "center" }}
      >
        <Column fillWidth gap="24">
          <FadeContent delay={0} duration={2000} style={{ width: "100%" }}>
            <Row fillWidth paddingLeft="l">
              <Column gap="12" maxWidth="s">
                <Badge
                  background="brand-alpha-weak"
                  paddingX="12"
                  paddingY="4"
                  onBackground="neutral-strong"
                  textVariant="label-default-s"
                  arrow={false}
                >
                  Services
                </Badge>
                <Heading as="h2" variant="display-strong-s" wrap="balance">
                  Focused on product feel, not just code
                </Heading>
                <Text variant="heading-default-l" onBackground="neutral-weak" wrap="balance">
                  I help you turn ideas into experiences that look sharp, feel smooth, and ship fast.
                </Text>
              </Column>
            </Row>
          </FadeContent>
          <FadeContent delay={0.15} duration={2000} blur style={{ width: "100%" }}>
            <Column fillWidth gap="20" marginTop="16">
              <Row fillWidth gap="20" s={{ direction: "column" }}>
                <Card
                  padding="l"
                  radius="l-4"
                  border="neutral-alpha-medium"
                  background="transparent"
                  style={{ flex: 1 }}
                >
                  <Column gap="12">
                    <Icon name="figma" onBackground="neutral-strong" size="l" />
                    <Heading as="h3" variant="heading-strong-l">
                      UI/UX & Visual Design
                    </Heading>
                    <Text onBackground="neutral-weak" variant="body-default-m" wrap="balance">
                      Interface design, design systems, and interactive prototypes focused on clarity.
                    </Text>
                  </Column>
                </Card>
                <Card
                  padding="l"
                  radius="l-4"
                  border="neutral-alpha-medium"
                  background="transparent"
                  style={{ flex: 1 }}
                >
                  <Column gap="12">
                    <Icon name="rocket" onBackground="neutral-strong" size="l" />
                    <Heading as="h3" variant="heading-strong-l">
                      Website & Landing Pages
                    </Heading>
                    <Text onBackground="neutral-weak" variant="body-default-m" wrap="balance">
                      Fast, responsive websites that communicate value and convert visitors.
                    </Text>
                  </Column>
                </Card>
              </Row>
              <Row fillWidth gap="20" s={{ direction: "column" }}>
                <Card
                  padding="l"
                  radius="l-4"
                  border="neutral-alpha-medium"
                  background="transparent"
                  style={{ flex: 1 }}
                >
                  <Column gap="12">
                    <Icon name="document" onBackground="neutral-strong" size="l" />
                    <Heading as="h3" variant="heading-strong-l">
                      Product & Content Support
                    </Heading>
                    <Text onBackground="neutral-weak" variant="body-default-m" wrap="balance">
                      IA, UX writing, and content structure to keep experiences consistent.
                    </Text>
                  </Column>
                </Card>
                <Card
                  padding="l"
                  radius="l-4"
                  border="neutral-alpha-medium"
                  background="transparent"
                  style={{ flex: 1 }}
                >
                  <Column gap="12">
                    <Icon name="arrowUpRightFromSquare" onBackground="neutral-strong" size="l" />
                    <Heading as="h3" variant="heading-strong-l">
                      Web & Mobile Feature Updates
                    </Heading>
                    <Text onBackground="neutral-weak" variant="body-default-m" wrap="balance">
                      Improve existing apps with new features, fixes, and UX polish.
                    </Text>
                  </Column>
                </Card>
              </Row>
            </Column>
          </FadeContent>
        </Column>
      </Column>
      {routes["/blog"] && (
        <Column
          fillWidth
          gap="24"
          paddingTop="8"
          paddingBottom="12"
          style={{ minHeight: "100vh", display: "flex", justifyContent: "center" }}
        >
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
            <FadeContent delay={0} duration={2000} style={{ flex: 1 }}>
              <Row flex={1} paddingLeft="l" paddingTop="24">
                <Heading as="h2" variant="display-strong-xs" wrap="balance">
                  Latest from the blog
                </Heading>
              </Row>
            </FadeContent>
            <FadeContent delay={0.2} duration={2000} blur style={{ flex: 3 }}>
              <Row flex={3} paddingX="20">
                <Posts range={[1, 2]} columns="2" />
              </Row>
            </FadeContent>
          </Row>
          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={48} />
          </Row>
        </Column>
      )}
      {routes["/work"] && (
        <Column
          fillWidth
          paddingY="12"
          style={{ minHeight: "100vh", display: "flex", justifyContent: "center" }}
        >
          <FadeContent delay={0.05} duration={2000} blur style={{ width: "100%" }}>
            <Projects range={[2]} />
          </FadeContent>
        </Column>
      )}
      <Column
        fillWidth
        paddingTop="12"
        paddingBottom="16"
        style={{ minHeight: "80vh", display: "flex", justifyContent: "center" }}
      >
        <FadeContent delay={0.15} duration={2000} blur style={{ width: "100%" }}>
          <ContactCard />
        </FadeContent>
      </Column>
    </Column>
  );
}
