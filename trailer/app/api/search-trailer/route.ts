import { NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movie = searchParams.get("movie");

  if (!movie) {
    return NextResponse.json(
      { error: "Movie parameter is required" },
      { status: 400 }
    );
  }

  try {
    const searchUrl = `https://www.traileraddict.com/search/${encodeURIComponent(
      movie
    )}`;
    const searchResponse = await axios.get(searchUrl);
    const $ = cheerio.load(searchResponse.data);

    const firstResult = $(".inner a").first().attr("href");

    if (firstResult) {
      const movieUrl = `https://www.traileraddict.com${firstResult}`;
      const movieResponse = await axios.get(movieUrl);
      const $movie = cheerio.load(movieResponse.data);

      const embedCode = $movie(".embed-code").first().text().trim();

      return NextResponse.json({ embedCode });
    } else {
      return NextResponse.json({ error: "No trailer found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
