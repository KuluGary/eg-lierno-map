import { MapLabel, MapMarker, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { MapFetchProps } from "types";

const prisma = new PrismaClient();

export default async function handler(_: NextApiRequest, res: NextApiResponse<MapFetchProps>) {
  const markers: MapMarker[] = await prisma["mapMarker"].findMany();
  const labels: MapLabel[] = await prisma["mapLabel"].findMany();

  res.json({ markers, labels });
}
