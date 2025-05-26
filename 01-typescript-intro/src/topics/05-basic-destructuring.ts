interface AudioPlayer {
  audioVolume: number;
  songDuration: number;
  song: string;
  details: Details;
}

interface Details {
  author: string;
  year: number;
}

const audioPlayer: AudioPlayer = {
  audioVolume: 90,
  songDuration: 36,
  song: "Mess",
  details: {
    author: "Ed Sheeran",
    year: 2015,
  },
};

const song = "New song";

const { song: anotherSong, songDuration: duration, details } = audioPlayer;

const { author, year } = details;

// console.log("Song ", song);
// console.log("AnotherSong ", anotherSong);
// console.log("Duration ", duration);
// console.log(`Author ${author}, Year: ${year}`);

// const dbz: string[] = ["Goku", "Vegeta", "Trunks"];
const dbz: string[] = ["Goku", "Vegeta"];

const [, , Trunks = 'Not found'] = dbz;

console.log("Personaje 3: ", Trunks);

export {};
