const img = document.createElement('img');

export const imgStyle = `
  img {
    width: 100%;
    -webkit-clip-path: polygon(
      5% 0, 0 5%, 0 95%, 5% 100%, 95% 100%, 100% 95%, 100% 5%, 95% 0
    );
    clip-path: polygon(
      5% 0, 0 5%, 0 95%, 5% 100%, 95% 100%, 100% 95%, 100% 5%, 95% 0
    );
  }
`;

export default img;
