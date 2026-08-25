import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Pause, Play } from 'lucide-react';
import { weddingData } from './data/wedding';
import heroImage from './assets/hero.jpeg';
import firstPhotoTogetherImage from './assets/first photo together.jpeg';
import CollegeImage from './assets/first photo.jpeg';
import bangaloreDaysImage from './assets/Bangalore days.jpeg';
import firstDayOfMcaImage from './assets/first day of MCA.jpeg';
import firstNightOutImage from './assets/First Night Out.jpeg';
import firstTripTogetherImage from './assets/First Trip together.jpeg';
import graduationImage from './assets/Graduation.jpeg';
import firstJobImage from './assets/first job.jpeg';
import perfectProjectPartnersImage from './assets/Perfect Project Partners.jpeg';
import photoshootDayImage from './assets/Photoshoot day.jpeg';
import tuitionTimeImage from './assets/Tuition time.jpeg';
import walkingImage from './assets/walk.jpeg';
import favoriteMomentImage from './assets/WhatsApp Image 2026-08-25 at 6.57.44 PM.jpeg';
import nowImage from './assets/now.jpeg';
import oldPhotoImage from './assets/old-photo.jpg';
import venueImage from './assets/Venue.jpeg';
import closingImage from './assets/closing.jpeg';
import perfectSong from './assets/song.mp3';

import './styles.css';

const envelopeCoverImage = `${import.meta.env.BASE_URL}images/cover-invitation.png`;
const frameImages = {
  firstPhotoTogether: firstPhotoTogetherImage,
  college: CollegeImage,
  bangaloreDays: bangaloreDaysImage,
  firstDayOfMca: firstDayOfMcaImage,
  firstNightOut: firstNightOutImage,
  firstTripTogether: firstTripTogetherImage,
  graduation: graduationImage,
  firstJob: firstJobImage,
  perfectProjectPartners: perfectProjectPartnersImage,
  photoshootDay: photoshootDayImage,
  tuitionTime: tuitionTimeImage,
  walk: walkingImage,
  favoriteMoment: favoriteMomentImage,
};
const fixationReelUrl = 'https://www.instagram.com/reel/C50tPyYJyLy/';
const fixationEmbedUrl = 'https://www.instagram.com/reel/C50tPyYJyLy/embed';

function useCountdown(targetDate) {
  const readTime = () => {
    const diff = Math.max(new Date(targetDate).getTime() - Date.now(), 0);
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [time, setTime] = useState(readTime);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(readTime()), 1000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  return time;
}

function Label({ children }) {
  return <p className="label">{children}</p>;
}

function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <span />
    </div>
  );
}

function Countdown() {
  const time = useCountdown(weddingData.date.iso);
  const units = [
    ['days', 'Days'],
    ['hours', 'Hours'],
    ['minutes', 'Minutes'],
    ['seconds', 'Seconds'],
  ];

  return (
    <div className="countdown" aria-label="Countdown to the wedding">
      {units.map(([key, label]) => (
        <div className="countdown-unit" key={key}>
          <strong>{String(time[key]).padStart(key === 'days' ? 2 : 2, '0')}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <img src={heroImage} alt="Ganga and Goutham together" />
      <div className="grain" />
      <div className="hero-copy reveal">
        <Label>2016 . 2017 . 2026</Label>
        <h1>{weddingData.couple.display}</h1>
        <p className="script">From classmates to forever, one chapter at a time.</p>
        <p className="date-line">{weddingData.date.dotted}</p>
        <Countdown />
        <a className="underlink light" href="#story">
          Our Story <span aria-hidden="true">{'->'}</span>
        </a>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="paper story" id="story">
      <div className="section-title centered reveal">
        <h2>Our Story</h2>
        <Divider />
      </div>
      <div className="timeline">
        {weddingData.story.map((item) => (
          <article className="timeline-item reveal" key={item.period}>
            <Label>{item.period}</Label>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PhotoTile({ item }) {
  const image = frameImages[item.variant];

  return (
    <figure className={`photo-tile ${item.variant}`}>
      <div className="photo-art">
        {image ? <img src={image} alt={item.title} /> : null}
      </div>
      <figcaption>{item.title}</figcaption>
    </figure>
  );
}

function Frames() {
  const scrollingFrames = [...weddingData.frames, ...weddingData.frames];

  return (
    <section className="paper frames" id="memories">
      <div className="section-title reveal">
        <h2>Frames From Our Story</h2>
        <p className="script left">Somewhere between then and now...</p>
      </div>
      <div className="photo-row reveal" aria-label="Frames from our story" tabIndex="0">
        <div className="photo-track">
          {scrollingFrames.map((item, index) => (
            <PhotoTile item={item} key={`${item.title}-${index}`} />
          ))}
        </div>
        <div className="photo-track" aria-hidden="true">
          {scrollingFrames.map((item, index) => (
            <PhotoTile item={item} key={`${item.title}-loop-${index}`} />
          ))}
        </div>
      </div>
      <div className="photo-row photo-row-reverse reveal" aria-hidden="true">
        <div className="photo-track">
          {scrollingFrames.map((item, index) => (
            <PhotoTile item={item} key={`${item.title}-reverse-${index}`} />
          ))}
        </div>
        <div className="photo-track">
          {scrollingFrames.map((item, index) => (
            <PhotoTile item={item} key={`${item.title}-reverse-loop-${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ThenNow() {
  return (
    <section className="sage then-now">
      <div className="then-heading reveal">
        <Label>Then & Now</Label>
        <h2>2016 <span aria-hidden="true">{'->'}</span> 2026</h2>
      </div>
      <div className="compare-grid reveal">
        <figure className="compare-card old">
          <img src={oldPhotoImage} alt="Ganga and Goutham in 2016" />
          <figcaption>2016</figcaption>
        </figure>
        <figure className="compare-card current">
          <img src={nowImage} alt="Ganga and Goutham in 2026" />
          <figcaption>2026</figcaption>
        </figure>
      </div>
      <p className="script compare-note">Ten years. Same two people. Very different hairstyles.</p>
    </section>
  );
}

function FixationCeremony() {
  return (
    <section className="sage fixation">
      <div className="fixation-copy reveal">
        <Label>Fixation Ceremony</Label>
        <p className="script">A small beginning to forever.</p>
      </div>
      <div className="fixation-reel reveal">
        <iframe
          src={fixationEmbedUrl}
          title="Ganga and Goutham fixation ceremony"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>
      <a className="underlink fixation-link reveal" href={fixationReelUrl} target="_blank" rel="noreferrer">
        Watch on Instagram <span aria-hidden="true">{'->'}</span>
      </a>
    </section>
  );
}

function Family() {
  return (
    <section className="paper family" id="family">
      <div className="section-title centered reveal">
        <h2>The People Who Have Been Part of Our Story</h2>
        <Divider />
      </div>
      <div className="family-list reveal">
        {weddingData.families.map((family) => (
          <section key={family.title}>
            <Label>{family.title}</Label>
            {family.members.map((member) => (
              <div className="family-member" key={member.name}>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </section>
        ))}
      </div>
    </section>
  );
}

function Venue() {
  return (
    <section className="forest venue" id="wedding">
      <div className="venue-copy reveal">
        <h2 className="script">And now, the next chapter.</h2>
        <p className="invite-line">With our hearts full, we invite you to celebrate this day with us.</p>
        <p className="date-line">{weddingData.date.dotted}</p>
        <h3>{weddingData.venue.name}</h3>
        <Label>{weddingData.venue.city}</Label>
      </div>
      <figure className="venue-photo reveal">
        <img src={venueImage} alt="Alakapuri Convention Center" />
      </figure>
      <a className="underlink light reveal" href={weddingData.mapsUrl} target="_blank" rel="noreferrer">
        Get Directions <span aria-hidden="true">{'->'}</span>
      </a>
    </section>
  );
}

function Music({ playing, onToggle }) {

  return (
    <section className="sage music" id="song">
      <div className="section-title centered reveal">
        <h2 className="script">One song. A thousand memories.</h2>
      </div>
      <button className="play-button reveal" type="button" onClick={onToggle}>
        {playing ? <Pause size={14} /> : <Play size={14} />}
        {playing ? 'Pause Perfect' : 'Play Perfect'}
      </button>
      <p className="muted-label">Ed Sheeran . Perfect</p>
    </section>
  );
}

function Closing() {
  return (
    <section className="paper closing">
      <div className="closing-copy reveal">
        <p>We met in 2016.</p>
        <p>We fell in love in 2017.</p>
        <p>We grew up together.</p>
        <p>And on {weddingData.date.display}...</p>
        <p>we begin forever.</p>
        <Divider />
        <h2>{weddingData.couple.mark}</h2>
        <Label>{weddingData.date.dotted}</Label>
        <p className="closing-muhurtham">Muhurtham . 11:40 AM to 12:04 PM</p>
        <p className="closing-place">Thiruvananthapuram</p>
        <p className="closing-invite">Your presence would mean the world to us.</p>
      </div>
      <img src={closingImage} alt="Ganga and Goutham" />
      <div className="end-mark" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

function Cover({ open, onOpen }) {
  return (
    <button
      className={`cover ${open ? 'open' : ''}`}
      type="button"
      onClick={onOpen}
      aria-label="Open wedding invitation"
    >
      <span className="cover-envelope">
        <img className="cover-art" src={envelopeCoverImage} alt="" aria-hidden="true" />
        <span className="cover-action">Tap to open</span>
      </span>
    </button>
  );
}

function App() {
  const [coverOpen, setCoverOpen] = useState(false);
  const [songPlaying, setSongPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const playSong = (restart = false) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false;
    audio.volume = 1;

    if (restart) {
      audio.currentTime = 0;
    }

    audio.play()
      .then(() => setSongPlaying(true))
      .catch(() => setSongPlaying(false));
  };

  const toggleSong = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (songPlaying) {
      audio.pause();
      setSongPlaying(false);
      return;
    }

    playSong();
  };

  const openInvitation = () => {
    setCoverOpen(true);
    playSong(true);
  };

  return (
    <>
      <Cover open={coverOpen} onOpen={openInvitation} />
      <main className={coverOpen ? 'invitation revealed' : 'invitation'} style={{ '--hero-image': `url("${heroImage}")` }}>
        <Hero />
        <Story />
        <Frames />
        <ThenNow />
        <FixationCeremony />
        <Family />
        <Venue />
        <Music playing={songPlaying} onToggle={toggleSong} />
        <Closing />
      </main>
      <audio
        ref={audioRef}
        src={perfectSong}
        preload="auto"
        onPlay={() => setSongPlaying(true)}
        onPause={() => setSongPlaying(false)}
        onEnded={() => setSongPlaying(false)}
      />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
