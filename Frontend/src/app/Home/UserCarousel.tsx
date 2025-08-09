"use client";
import { useState } from "react";
import styles from "./UserCarousel.module.css";

const baseVideos = [
  "/videos/testing.mp4",
  "/videos/subway.mp4",
  "/videos/subway_surf.mp4",
  "/videos/subway_surf.webm",
];

// If you want to loop videos to fill carousel with 10 items per row, multiply
const videos = [...Array(10)].flatMap(() => baseVideos).slice(0, 10);

export default function UserCarousel() {
  return (
    <section className={styles.carouselSection}>
      <h2 className={styles.heading}>Recently Generated Videos</h2>
      <div className={styles.carouselWrapper}>
        {[1, 2].map((row) => (
          <div key={row} className={styles.carouselRow}>
            {videos.map((videoSrc, idx) => (
              <video
                key={idx}
                src={videoSrc}
                className={styles.video}
                muted
                loop
                autoPlay
                playsInline
                preload="auto"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
