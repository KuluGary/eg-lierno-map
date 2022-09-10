import { PrismaClient, TimelineMarker, TimelineRange } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { TimelineFetchProps } from "types";

const prisma = new PrismaClient();

export default async function handler(_: NextApiRequest, res: NextApiResponse<TimelineFetchProps>) {
  const ranges: TimelineRange[] = await prisma["timelineRange"].findMany();
  const markers: TimelineMarker[] = await prisma["timelineMarker"].findMany({
    orderBy: {
      date_year: "asc",
    },
  });

  res.json({ markers, ranges });
}
