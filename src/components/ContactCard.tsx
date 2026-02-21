"use client";

import { person, social } from "@/resources";
import {
    Column,
    Heading,
    Text,
    Row,
    Icon,
    SmartLink,
    Background
} from "@once-ui-system/core";

export const ContactCard: React.FC<React.ComponentProps<typeof Column>> = ({ ...props }) => {
    return (
        <Column
            overflow="hidden"
            fillWidth
            padding="xl"
            marginBottom="m"
            horizontal="center"
            {...props}
        >

            {/* 2 Column Layout */}
            <Row
                fillWidth
                gap="xl"
                vertical="start"
                s={{ direction: "column" }}
            >
                {/* Left Column - Hire/Collaboration Text */}
                <Column flex={1} gap="m" vertical="start">
                    <Heading variant="display-strong-l" wrap="balance">
                        Let's Work Together
                    </Heading>
                    <Text
                        variant="body-default-l"
                        onBackground="neutral-weak"
                        wrap="balance"
                    >
                        I'm available for freelance projects, collaborations, and full-time opportunities.
                        Feel free to reach out if you'd like to discuss how we can work together.
                    </Text>
                </Column>

                {/* Right Column - Contact Information */}
                <Column flex={1} gap="m">
                    {/* Email */}
                    <Row
                        fillWidth
                        gap="12"
                        padding="16"
                        radius="m"
                        border="neutral-alpha-medium"
                        vertical="center"
                    >
                        <Icon name="email" onBackground="neutral-strong" size="l" />
                        <Column gap="4" fillWidth>
                            <Text variant="label-default-s" onBackground="neutral-weak">
                                Email
                            </Text>
                            <SmartLink
                                href={`mailto:${person.email}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <Text variant="body-default-m" onBackground="neutral-strong">
                                    {person.email}
                                </Text>
                            </SmartLink>
                        </Column>
                    </Row>

                    {/* Location */}
                    <Row
                        fillWidth
                        gap="12"
                        padding="16"
                        radius="m"
                        border="neutral-alpha-medium"
                        vertical="center"
                    >
                        <Icon name="globe" onBackground="neutral-strong" size="l" />
                        <Column gap="4" fillWidth>
                            <Text variant="label-default-s" onBackground="neutral-weak">
                                Location
                            </Text>
                            <Text variant="body-default-m" onBackground="neutral-strong">
                                {person.location}
                            </Text>
                        </Column>
                    </Row>

                    {/* Social Links */}
                    <Column fillWidth gap="12">
                        <Text variant="label-default-s" onBackground="neutral-weak">
                            Connect with me
                        </Text>
                        <Row fillWidth gap="8" wrap>
                            {social
                                .filter(item => item.essential)
                                .map((item, index) => (
                                    <SmartLink
                                        key={index}
                                        href={item.link}
                                        style={{ flex: '1 1 calc(50% - 4px)', minWidth: '120px' }}
                                    >
                                        <Row
                                            fillWidth
                                            gap="8"
                                            padding="12"
                                            radius="m"
                                            border="neutral-alpha-medium"
                                            vertical="center"
                                            style={{
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'var(--neutral-alpha-weak)';
                                                e.currentTarget.style.borderColor = 'var(--neutral-alpha-strong)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'transparent';
                                                e.currentTarget.style.borderColor = 'var(--neutral-alpha-medium)';
                                            }}
                                        >
                                            <Icon name={item.icon} onBackground="neutral-medium" size="s" />
                                            <Text variant="body-default-s" onBackground="neutral-strong">
                                                {item.name}
                                            </Text>
                                        </Row>
                                    </SmartLink>
                                ))}
                        </Row>
                    </Column>
                </Column>
            </Row>
        </Column>
    );
};
