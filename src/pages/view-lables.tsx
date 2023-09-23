import React, { useEffect, useState } from "react";
import {
  Button,
  RecordItem,
  FlameSVG,
  Typography,
  CheckSVG,
  CopySVG,
} from "@ensdomains/thorin";
import { NextSeo } from "next-seo";
import { Container, Layout } from "@/components/templates";
import { NavBar } from "@/components/NavBar";
import Link from "next/link";

export default function Labels() {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-names?domain=_label.eth");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        if (data) {
          setLabels(data);
        } else {
          console.error(
            "Error: received data does not contain a 'label' property",
            data
          );
          setLabels([]);
        }
      } catch (error) {
        console.error("Error fetching the label:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NextSeo title="View Labels" />
      <header>
        <NavBar />
      </header>
      <Container as="main" $variant="flexVerticalCenter" $width="large">
        <Layout>
          {Array.isArray(labels) && <LabelsTable labels={labels} />}
        </Layout>
      </Container>
    </>
  );
}

function LabelsTable({ labels }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Address
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Set By
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {labels.map((label, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              <Link
                href={`https://etherscan.io/name-lookup-search?id=${label.name}._label.eth`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700"
              >
                {label.name}._label.eth
              </Link>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <AddressTooltip tooltipText={label.address}>
                {truncateAddress(label.address)}
              </AddressTooltip>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <AddressTooltip tooltipText={label.text_records.description}>
                {truncateAddress(label.text_records.description)}
              </AddressTooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function AddressTooltip(props) {
  const [isCopySuccess, setIsCopySuccess] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  function copyToClipboard() {
    navigator.clipboard.writeText(props.tooltipText).then(() => {
      setIsCopySuccess(true);
      setTimeout(() => {
        setIsCopySuccess(false);
      }, 2000);
    });
  }

  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  return (
    <div
      className="tooltip relative cursor-pointer inline-block"
      onMouseEnter={() => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        setIsTooltipVisible(true);
      }}
      onMouseLeave={() => {
        const timeoutId = setTimeout(() => {
          setIsTooltipVisible(false);
        }, 350); // delay in ms
        setHoverTimeout(timeoutId);
      }}
    >
      {props.children}
      {isTooltipVisible && (
        <span className="tooltiptext absolute bg-gray-200 text-gray-800 p-2 rounded shadow-md -top-12 -right-1/2 transform translate-x-1/2">
          {props.tooltipText}
          <button
            className="copy-button ml-2 p-1 hover:bg-gray-300 rounded"
            onClick={copyToClipboard}
          >
            {isCopySuccess ? <CheckSVG /> : <CopySVG />}
          </button>
        </span>
      )}
    </div>
  );
}
