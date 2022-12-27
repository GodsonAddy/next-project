import React from "react";
import CommunityMember from "../../components/Community-Member";
import { getSession } from "next-auth/react";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

function Resources() {
  return <CommunityMember>Resources</CommunityMember>;
}

export default Resources;
