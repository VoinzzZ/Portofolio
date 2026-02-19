import { Row, IconButton, SmartLink, Text } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from "./Footer.module.scss";
import { FadeContent } from "@/components/FadeContent";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Row as="footer" fillWidth padding="8" horizontal="center" s={{ direction: "column" }}>
      <FadeContent delay={0.1} duration={600} style={{ width: "100%" }}>
        <Row
          className={styles.mobile}
          maxWidth="m"
          paddingY="8"
          paddingX="16"
          gap="16"
          horizontal="between"
          vertical="center"
          s={{
            direction: "column",
            horizontal: "center",
            align: "center",
          }}
        >
          <Text variant="body-default-s" onBackground="neutral-strong">
            <Text onBackground="neutral-weak">© {currentYear} /</Text>
            <Text paddingX="4">{person.name}</Text>
            <Text onBackground="neutral-weak">
              {/* Usage of this template requires attribution. Please don't remove the link to Once UI unless you have a Pro license. */}
              / Build your portfolio with{" "}
              <SmartLink href="https://once-ui.com/products/magic-portfolio">Once UI</SmartLink>
            </Text>
          </Text>
        </Row>
      </FadeContent>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};

