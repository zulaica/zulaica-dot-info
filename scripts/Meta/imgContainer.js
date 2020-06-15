const imgContainer = document.createElement("div");

export const imgContainerStyle = `
  div {
    display: flex;
    align-items: center;
    justify-items: center;
    width: 33vw;
    height: 33vw;
    margin: auto;
    background: var(--img-container-color);
    border: 1px solid var(--img-container-color);
    border-radius: 3px;
    box-shadow: var(--shade);
  }

  div::after {
    content: "";
    position: absolute;
    width: 33vw;
    height: 33vw;
    border-radius: 2px;
    background: #fff;
    -webkit-clip-path: polygon(
      0px 0px, 0px 100%, 100% 100%, 100% 0px, 0px 0px, 2.5% 2.5%, 5% 1px, 95% 1px, calc(33vw - 1px) 5%, calc(33vw - 1px) 95%, 95% calc(33vw - 1px), 5% calc(33vw - 1px), 1px 95%, 1px 5%, 2.5% 2.5%
    );
    clip-path: polygon(
      0px 0px, 0px 100%, 100% 100%, 100% 0px, 0px 0px, 2.5% 2.5%, 5% 1px, 95% 1px, calc(33vw - 1px) 5%, calc(33vw - 1px) 95%, 95% calc(33vw - 1px), 5% calc(33vw - 1px), 1px 95%, 1px 5%, 2.5% 2.5%
    );
  }
`;

export default imgContainer;
