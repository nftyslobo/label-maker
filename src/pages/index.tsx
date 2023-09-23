import {
  Button,
  Card,
  EnsSVG,
  Heading,
  Typography,
  Input,
} from "@ensdomains/thorin";
import { NextSeo } from "next-seo";
import styled, { css } from "styled-components";

import { Container, Layout } from "@/components/templates";
import { ConnectButton } from "@/components/ConnectButton";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();
  console.log(isConnected);

  return (
    <>
      <NextSeo title="Home" />

      <Layout>
        {/* Placeholder for the header */}
        <ConnectButton></ConnectButton>
        <header />

        {/* Main content */}
        <Container as="main" $variant="flexVerticalCenter" $width="large">
          <Heading level="1">Label Maker Pro {isConnected}</Heading>

          <div className="grid grid-cols-7 gap-4">
            <div className="col-span-4">
              <Input label="Eth Address" placeholder="0xA0Cf…251e" />
            </div>
            <div className="col-span-3">
              <Input
                label="Label"
                placeholder="timelock.compound"
                suffix="._lable.eth"
              />
            </div>
            <div className="col-start-1 col-end-8 flex justify-center items-center ">
              <Button className="max-w-[256px] " disabled={!isConnected}>
                {!isConnected && <div>Connect To Assign</div>}
                {isConnected && <div>Assign Label</div>}
              </Button>
            </div>
          </div>
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
