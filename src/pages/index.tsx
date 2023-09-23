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
import { useState } from "react";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [postData, setPostData] = useState(null);

  const handleButtonClick = async () => {
    try {
      const response = await fetch("/api/set-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain: "_label.eth",
          name: "frank",
          address: "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      setPostData(data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

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
          <div>
            <Button onClick={handleButtonClick}>Send POST Request</Button>
            {postData && <div>{JSON.stringify(postData)}</div>}
          </div>
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
