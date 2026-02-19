import {
  Heading,
  Text,
  Button,
  Avatar,
  Column,
  Badge,
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
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
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
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <FadeContent
              delay={0}
              duration={600}
              style={{ width: "100%", display: "flex", justifyContent: "center", paddingTop: "16px", paddingBottom: "32px", paddingLeft: "12px" }}
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
          <FadeContent delay={0.1} duration={700} style={{ width: "100%", paddingBottom: "16px" }}>
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </FadeContent>
          <FadeContent delay={0.2} duration={700} style={{ width: "100%", paddingBottom: "32px" }}>
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </FadeContent>
          <FadeContent delay={0.35} duration={600} style={{ paddingTop: "12px", paddingLeft: "12px" }}>
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
        <FadeContent delay={0.1} duration={700} blur style={{ width: "100%" }}>
          <Projects range={[1, 1]} />
        </FadeContent>
      )}
      {routes["/blog"] && (
        <Column fillWidth gap="24" marginBottom="l">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
            <FadeContent delay={0} duration={600} style={{ flex: 1 }}>
              <Row flex={1} paddingLeft="l" paddingTop="24">
                <Heading as="h2" variant="display-strong-xs" wrap="balance">
                  Latest from the blog
                </Heading>
              </Row>
            </FadeContent>
            <FadeContent delay={0.15} duration={700} blur style={{ flex: 3 }}>
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
        <FadeContent delay={0.05} duration={700} blur style={{ width: "100%" }}>
          <Projects range={[2]} />
        </FadeContent>
      )}
      <FadeContent delay={0.1} duration={700} blur style={{ width: "100%" }}>
        <ContactCard />
      </FadeContent>
    </Column>
  );
}
