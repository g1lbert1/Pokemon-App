// src/TestApollo.jsx
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";

const TEST_QUERY = gql`{ __typename }`;

export default function TestApollo() {
  const { loading, error, data } = useQuery(TEST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return <p>Success: {data.__typename}</p>;
}

