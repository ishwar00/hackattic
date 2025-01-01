import { Jimp } from "jimp";
import jsQR from "jsqr";

async function readQR() {
  const qrEndpoint = 'https://hackattic.com/challenges/reading_qr/problem?access_token=9a79df281bad8af0';
  const { image_url } = await fetch(qrEndpoint).then(res => res.json()) as { image_url: string };
  const imageData = await fetch(image_url).then(res => res.arrayBuffer());

  const image = await Jimp.fromBuffer(imageData);
  const output = jsQR(Uint8ClampedArray.from(image.bitmap.data), image.width, image.height);

  const solutionEndpoint = 'https://hackattic.com/challenges/reading_qr/solve?access_token=9a79df281bad8af0'
  const response = await fetch(solutionEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: output?.data,
    }),
  }).then(res => res.json());
  console.log(response);
}

readQR();

