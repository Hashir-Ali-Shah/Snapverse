import styles from './UserCarousel.module.css';

export default function UserCarousel() {
  return (
    <section className={styles.carouselSection}>
      <h2 className={styles.heading}>Recently Generated Videos</h2>
      <div className={styles.carouselWrapper}>
        {[1, 2].map((row) => (
          <div key={row} className={styles.carouselRow}>
            {[...Array(10)].map((_, idx) => (
              <div key={idx} className={styles.videoPlaceholder}></div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
