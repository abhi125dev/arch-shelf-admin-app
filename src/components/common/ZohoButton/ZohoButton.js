import React, { useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import styles from "./ZohoButton.module.scss";

const ZohoButton = () => {
  const [opened, setOpened] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleClick = useCallback(() => {
    setOpened((prevOpened) => {
      if (window.ZohoHCAsap) {
        window.ZohoHCAsap.Action(prevOpened ? "close" : "open");
      }
      return !prevOpened;
    });
  }, [setOpened]);

  useEffect(() => {
    let openButton;
    let timeout;

    const handleClickOpenButton = () => {
      setOpened(true);
    };

    const stylesEl = document.createElement("style");
    stylesEl.appendChild(
      document.createTextNode(
        "#zohohc-asap-web-launcherbox{ display: none !important}"
      )
    );

    window.ZohoHCAsapReady(() => {
      document.head.appendChild(stylesEl);
      setLoaded(true);
      timeout = setTimeout(() => {
        openButton = document.getElementById("zohohc-asap-web-launcherbox");

        if (openButton) {
          openButton.addEventListener("click", handleClickOpenButton);
        }
      }, 300);
    });

    return () => {
      clearTimeout(timeout);
      document.head.removeChild(stylesEl);
      if (openButton) {
        openButton.removeEventListener("click", handleClickOpenButton);
      }
    };
  }, [setOpened, setLoaded]);

  useEffect(() => {
    let closeButtonDesktop;
    let closeButtonMobile;
    let timeout;
    const handleClickCloseButton = () => {
      setOpened(false);
    };
    if (opened) {
      timeout = setTimeout(() => {
        closeButtonDesktop = document.getElementById(
          "zohohc-asap-web-launcherbox-close"
        );
        closeButtonMobile = document.getElementById(
          "zohohc-asap-web-mobilecloseicon"
        );

        if (closeButtonDesktop) {
          closeButtonDesktop.addEventListener("click", handleClickCloseButton);
        }
        if (closeButtonMobile) {
          closeButtonMobile.addEventListener("click", handleClickCloseButton);
        }
      }, 200);
    }

    return () => {
      clearTimeout(timeout);
      if (closeButtonDesktop) {
        closeButtonDesktop.removeEventListener("click", handleClickCloseButton);
      }
      if (closeButtonMobile) {
        closeButtonMobile.removeEventListener("click", handleClickCloseButton);
      }
    };
  }, [opened, setOpened]);

  const isIE = useMemo(
    () => window.navigator.userAgent.includes("Trident/"),
    []
  );

  return (
    loaded &&
    !isIE && (
      <>
        <div
          role="button"
          tabIndex="0"
          onClick={handleClick}
          className={styles.maindiv}
          onKeyDown={handleClick}
        >
          <button type="button" className={styles.root}>
            <div className={styles.content}>
              <span className={styles.wrap}>
                <span className={styles.icon}>
                  <svg
                    className={classNames(styles.svg, opened && styles.opened)}
                  >
                    <use
                      xlinkHref={
                        opened
                          ? "#zohohc-asap-sybl-close"
                          : "#zohohc-asap-sybl-inappweb_idea"
                      }
                    />
                  </svg>
                </span>
              </span>
            </div>
          </button>
          <span className="mtext">Help Centre</span>
        </div>
      </>
    )
  );
};

export default ZohoButton;
