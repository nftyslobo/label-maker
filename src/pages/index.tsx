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

import { NavBar } from "@/components/NavBar";
import { useAccount } from "wagmi";
import { useState, ChangeEvent } from "react";
import Link from "next/link";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [postData, setPostData] = useState(null);
  const [inputAddress, setInputAddress] = useState("");
  const [inputLabel, setInputLabel] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputAddress(event.target.value);
    setIsValid(
      event.target.value.startsWith("0x") && event.target.value.length === 42
    );
  };

  const handleLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputLabel(event.target.value);
  };

  const assignLabel = async () => {
    try {
      console.log(inputAddress);
      console.log(inputLabel);
      const response = await fetch("/api/set-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain: "_label.eth",
          name: inputLabel,
          address: inputAddress,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      setPostData(data);
      setInputAddress("");
      setInputLabel("");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <>
      <NextSeo title="Home" />
      <header>
        <NavBar />
      </header>
      <Layout>
        {/* Placeholder for the header */}

        {/* Main content */}
        <Container as="main" $variant="flexVerticalCenter" $width="large">
          <Typography className="max-w-sm text-center">
            Address book for Ethereum addresses.
          </Typography>

          <div className="flex-col gap-12 ">
            <div className="pb-8 pt-8 w-[450px]">
              <Input
                label="ETH Address"
                placeholder="0xA0Cf…251e"
                value={inputAddress}
                onChange={handleAddressChange}
              />
            </div>
            <div className="pb-8">
              <Input
                label="Name"
                placeholder="timelock.compound"
                suffix="._label.eth"
                value={inputLabel}
                onChange={handleLabelChange}
              />
            </div>
            <div className="px-8 flex justify-center items-center ">
              <Button
                onClick={assignLabel}
                className="max-w-[256px]"
                disabled={!isConnected || !isValid}
              >
                {!isConnected ? (
                  <div>Connect To Label</div>
                ) : !isValid ? (
                  <div>Address Invalid</div>
                ) : (
                  <div>Assign Label</div>
                )}
              </Button>
              {postData && <div>{JSON.stringify(postData)}</div>}
            </div>
          </div>
        </Container>
        {/* Placeholder for the footer */}
        <footer />
      </Layout>
    </>
  );
}
