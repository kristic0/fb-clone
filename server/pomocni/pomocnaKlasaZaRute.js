import { Korisnik } from "../modeli/Korisnik.js";

export async function dodajSlikuNaKorisnika(imageId, userId) {
  await Korisnik.findOne({ _id: userId }, function (err, user) {
    user.images = [...user.images, imageId];

    user.save((err) => {
      if (err) {
        console.error("err!");
      }
    });
  });
}

export async function pronadjiIdeveSlikaKorisnika(userId) {
  let ideviSlika;

  await Korisnik.findOne(
    { _id: userId },
    { _id: 0, images: 1 },
    function (err, data) {
      if (err) {
        ideviSlika = null;
      } else {
        ideviSlika = data;
      }
    }
  );

  return ideviSlika;
}
