import { Button, Card, EnsSVG, Heading, Typography } from "@ensdomains/thorin";
import { NextSeo } from "next-seo";
import styled, { css } from "styled-components";

import { Container, Layout } from "@/components/templates";

export default function Home() {
  return (
    <>
      <NextSeo title="Home" />

      <Layout>
        {/* Placeholder for the header */}
        <header />

        {/* Main content */}
        <Container as="main" $variant="flexVerticalCenter" $width="large">
          <SvgWrapper>
            <EnsSVG />
          </SvgWrapper>

          <Heading level="1">ENS Frontend Examples</Heading>
          <div>
            <p className="text-xs">This is extra small text.</p>
            <p className="text-sm">This is small text.</p>
            <p className="text-base">This is base text.</p>
            <p className="text-lg">This is large text.</p>
            <p className="text-xl">This is extra large text.</p>
            <p className="text-2xl">This is 2x large text.</p>
            {/* ... and so on */}
          </div>
          <ExamplesGrid>
            <Card title="Name/Address Input">
              <Typography color="textSecondary">
                Every address input should also accept ENS names.
              </Typography>

              <Button as="a" href="/input">
                View
              </Button>
            </Card>

            <Card title="ENS Profile">
              <Typography color="textSecondary">
                Show the primary and avatar for an ENS name.
              </Typography>

              <Button as="a" href="/profile">
                View
              </Button>
            </Card>
          </ExamplesGrid>
        </Container>

        {/* Placeholder for the footer */}
        <footer />
      </Layout>
    </>
  );
}

const SvgWrapper = styled.div(
  ({ theme }) => css`
    --size: ${theme.space["16"]};
    width: var(--size);
    height: var(--size);

    svg {
      width: 100%;
      height: 100%;
    }
  `
);

const ExamplesGrid = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: grid;
    gap: ${theme.space["4"]};
    grid-template-columns: repeat(auto-fit, minmax(${theme.space["64"]}, 1fr));
  `
);
