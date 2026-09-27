// Freely licensed photos of Temple's Main Campus from Wikimedia Commons.
// CC BY and CC BY-SA photos must keep their credit wherever they appear.

export type Photo = {
  src: string;
  alt: string;
  credit: string;
  creditHref: string;
  /** CSS object-position, used to keep the subject in frame when cropped. */
  position?: string;
};

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const photos = {
  oconnorPlaza: {
    src: "/campus/oconnor-plaza.jpg",
    alt: "O'Connor Plaza at sunset, with the owl statue and the Bell Tower behind it",
    credit: "ImagineerJC, CC0",
    creditHref: commons("O%27Connor_Plaza_in_2018.jpg"),
    position: "38% 62%",
  },
  bellTower: {
    src: "/campus/bell-tower.jpg",
    alt: "The Bell Tower on Temple's Main Campus in the snow",
    credit: "ImagineerJC, CC0",
    creditHref: commons("Temple_University_Bell_Tower_in_winter.jpg"),
    position: "50% 55%",
  },
  cherryBlossoms: {
    src: "/campus/cherry-blossoms.jpg",
    alt: "Cherry trees in bloom beside a lawn on Temple's campus",
    credit: "AGnias47, CC BY 4.0",
    creditHref: commons("Cherry_Blossoms_at_Temple_University.jpg"),
    position: "50% 55%",
  },
  charlesLibrary: {
    src: "/campus/charles-library.jpg",
    alt: "Charles Library and its curved wooden entrance",
    credit: "Jim Henderson, CC BY 4.0",
    creditHref: commons("Charles_Library_winter_jeh.jpg"),
    position: "60% 50%",
  },
  beuryBeach: {
    src: "/campus/beury-beach.jpg",
    alt: "Students sitting on the Beury Beach lawn near the Bell Tower",
    credit: "ImagineerJC, CC0",
    creditHref: commons("Beury_Beach,_Bell_Tower,_Paley_Library.jpg"),
    position: "50% 60%",
  },
  southEnd: {
    src: "/campus/south-end.jpg",
    alt: "Broad Street at the south end of Main Campus at sunset",
    credit: "ImagineerJC, CC0",
    creditHref: commons("South_end_of_Temple%27s_Main_Campus.jpg"),
    position: "50% 45%",
  },
  gittis: {
    src: "/campus/gittis.jpg",
    alt: "The Howard Gittis Student Center",
    credit: "ImagineerJC, CC0",
    creditHref: commons("Howard_Gittis_Student_Center.jpg"),
    position: "50% 55%",
  },
  morganHall: {
    src: "/housing/morgan-hall.jpg",
    alt: "Morgan Hall North and Morgan Hall South on Temple's Main Campus",
    credit: "ImagineerJC, CC0",
    creditHref: commons("Morgan_Hall_North_from_Morgan_Hall_South_in_2016.jpg"),
    position: "50% 30%",
  },
  cecilBMoore: {
    src: "/campus/cbm-station.jpg",
    alt: "The Cecil B. Moore Broad Street Line entrance on Broad Street",
    credit: "Ii2nmd, CC BY-SA 4.0",
    creditHref: commons("Cecil_B_Moore_station_2018.jpg"),
    position: "50% 60%",
  },
} satisfies Record<string, Photo>;
