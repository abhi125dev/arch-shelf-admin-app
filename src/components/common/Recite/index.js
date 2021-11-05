import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { Dimmer, Loader } from "semantic-ui-react";
import { withContext } from "Context";
import "./recite.scss";
import { useMutation } from "@apollo/react-hooks";
import { profileUpdateAction } from "../../../store/actions/profileActions";
import { UPDATE_PROFILE_MUTATION } from "../../../store/mutations/profileMutations";
import useCloseRecite from "./useCloseRecite";

const getRandomColor = () =>
  Array(3)
    .fill(0)
    .map(() => Math.floor(256 * Math.random()));

const reciteParserHtml = (function() {
  let options = {
    maxCharacters: 1e3,
    minCharacters: 1,
    wrapTag: "recite",
    elementAttribute: "data-recite-ele",
    concatenateTypes: ["inline", "inline-block"],
    skipConcatenation: { elementTypes: ["li", "img"], selectors: [] },
    skipElements: "SCRIPT STYLE SELECT OPTION FRAMESET FRAME IFRAME NOSCRIPT".split(
      " "
    ),
    parseImgAltAttribute: !0,
    bubbleEvents: !1,
    bubbleStyles: !0,
    debug: { highlightElements: !1 },
    concatenateElementExceptions: ["li"],
  };
  let c = [];

  const getElement = (elements) => {
    let element = null;

    if (elements.length) {
      let characterCount = 0;
      let isSingleElement = false;

      window.Recite.Util.each(elements, (_, el) => {
        characterCount += window.Recite.Dom.getText(el).trim().length;

        if (
          el.nodeName === "IMG" ||
          el.nodeName === "INPUT" ||
          el.nodeName === "TEXTAREA"
        ) {
          isSingleElement = true;

          el.setAttribute(options.elementAttribute, "true");

          element = el;
        }
      });

      if (options.minCharacters <= characterCount && !isSingleElement) {
        let isDatepicker = false;

        window.Recite.Util.each(
          window.Recite.Dom.getAncestors(elements[0]),
          function(_, item) {
            if (
              item.classList.contains("ui-datepicker") &&
              elements[0].nodeType === 3
            ) {
              isDatepicker = true;

              element = elements[0].parentNode;

              element.classList.add("recite-ele");
            }
          }
        );

        if (!isDatepicker) {
          element =
            elements[0].nodeType === 3 ? elements[0].parentNode : elements[0];

          if (element) {
            element.classList.add("recite-ele");

            if (options.debug.highlightElements) {
              const color = getRandomColor();

              try {
                element.style.backgroundColor = `rgba(${color.join(", ")}, .4)`;
              } catch {
                element.style.backgroundColor = `rgba(${color.join(", ")})`;
              }
            }
          }
        }
      }
    }

    return element;
  };

  const parse = (el, a, f = [[]]) => {
    var g = false,
      e = false;

    if (el.nodeType === 1 && el.classList.contains("recite-ele")) {
      return f;
    }

    if (el) {
      if (
        el.nodeType === 1 &&
        (window.Recite.Util.inArray(el.tagName, options.skipElements) >= 0 ||
          el.dataset.reciteSkip ||
          (c.length && el.tagName === "BR" && c[c.length - 1].tagName === "BR"))
      ) {
        return f;
      }

      if (el.nodeType === 3) {
        window.Recite.Dom.getText(el)
          .replace(/^\s*/, "")
          .replace(/\s*$/, "");
      }

      if (el.nodeType === 1) {
        const concatenateElements = [];
        const concatenateTypes = [];

        window.Recite.Util.each(
          options.concatenateElementExceptions,
          (_, e) => {
            concatenateElements.push(e.toLowerCase());
          }
        );
        window.Recite.Util.each(
          options.skipConcatenation.elementTypes,
          (_, e) => {
            concatenateElements.push(e.toLowerCase());
          }
        );
        window.Recite.Util.each(options.concatenateTypes, (_, e) => {
          concatenateTypes.push(e.toLowerCase());
        });

        var m = !!window.Recite.Util.inArray(
            window.Recite.Dom.getStyle(el, "display"),
            concatenateTypes
          ),
          p = false;

        window.Recite.Util.each(options.skipConcatenation.selectors, (_, e) => {
          window.Recite.Util.each(window.Recite.Sizzle(e), function(_, e) {
            if (e === el) {
              p = true;
            }
          });
        });

        // eslint-disable-next-line no-cond-assign
        if (
          (m =
            m &&
            !window.Recite.Util.inArray(
              el.tagName.toLowerCase(),
              concatenateElements
            ) &&
            !p)
        ) {
          // {
          // 	if (el.nodeType === 1) {
          // 		el.querySelectorAll('*').forEach(e => {
          // 			if (window.Recite.Dom.getStyle(e, 'display') === 'block') {
          // 				m = true
          // 				return false
          // 			}
          // 		})
          // 	}
          // 	m = !1
          // }
          m = !m;
        }

        if (
          m ||
          el.nodeName === "INPUT" ||
          (el.nodeName === "TEXTAREA" && el.dataset.reciteSkip)
        ) {
          g = true;
        }
      } else if (el.nodeType === 3) {
        g = true;
      }

      if (g && el.previousSibling !== c[c.length - 1]) {
        f.push(c);
        c = [];
        c.push(el);
        e = true;
      }

      g = 0;
      m = el.childNodes[g];

      if (!e) {
        while (m) {
          parse(m, a + 1, f);
          g++;
          m = el.childNodes[g];
        }
      }
    }

    return f;
  };

  return {
    setOptions: (opt) => {
      window.Recite.Debug.log("Recite.Parser.Html", "Setting options");

      options = window.Recite.Util.merge(options, opt);
    },
    parse: (block) => {
      const now = new Date();
      const elements = parse(block, 1);
      const images = window.Recite.Sizzle("img");

      window.Recite.Util.each(images, (_, img) => {
        !img.dataset.reciteSkip && elements.push([img]);
      });

      if (c.length) {
        elements.push(c);
      }

      if (!elements[elements.length - 1].length) {
        elements.pop();
      }

      const refs = [];

      window.Recite.Util.each(elements, function(_, el) {
        if (el.length) {
          const elRef = getElement(el);

          if (elRef) {
            refs.push(elRef);
          }
        }
      });

      window.Recite.Debug.log(
        "Recite.Parser.Html",
        "Parsed " +
          refs.length +
          " elements in: " +
          (new Date().getTime() - now.getTime()) +
          "ms"
      );

      if (options.bubbleEvents) {
        const elements = window.Recite.Sizzle(".recite-ele");

        window.Recite.DomEvent.add(elements, "click", (e) => {
          e.target.parentNode.click();
        });
      }

      window.Recite.Event.publish("Recite.Parser:parsed");

      if (window.Recite.Style.getOptions().preserve_background_images) {
        document.querySelectorAll("*").forEach((el) => {
          if (el.style.backgroundImage) {
            el.classList.add("recite-ignore-styles-background");
          }
        });
      }

      return refs;
    },
    wrapElements: (elements) => {
      window.Recite.Util.each(elements, (_, el) => {
        getElement(el);
      });
    },
  };
})();

const ReciteComponent = ({ user, updateProfileSuccess }) => {
  const { accessibility = false } = user;
  const [loading, setLoading] = useState(false);
  const [updateProfileMutation] = useMutation(UPDATE_PROFILE_MUTATION);
  const reciteScriptId = "recite-script";
  const timeoutRef = useRef(null);

  const toggleLoader = useCallback(
    (state = true, callback) => {
      clearTimeout(timeoutRef.current);
      if (state) {
        setLoading(state);
      } else {
        timeoutRef.current = setTimeout(() => {
          if (typeof callback === "function") {
            callback();
          }
          setLoading(state);
        }, 1000);
      }
    },
    [setLoading]
  );

  const handleUpdateUser = useCallback(() => {
    setLoading(true);
    updateProfileMutation({
      variables: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        username: user.username,
        accessibility: false,
      },
    }).then(({ data: { updateProfile } }) => {
      if (Boolean(updateProfile) === true) {
        updateProfileSuccess({ ...user, accessibility: false });

        setLoading(false);
      }
    });
  }, [updateProfileMutation, updateProfileSuccess, user, setLoading]);

  const closeRecite = useCloseRecite(handleUpdateUser);

  const reciteDisable = useCallback(() => {
    if (typeof window.Recite !== "undefined" && window.Recite.isEnabled()) {
      window.Recite.disable(true);
    }
  }, []);

  const reciteEnable = useCallback(() => {
    if (typeof window.Recite !== "undefined" && !window.Recite.isEnabled()) {
      toggleLoader();

      window.Recite.load({
        autoEnable: false,
        //Debug: { log: true },
        //Parser: { Html: { debug: { highlightElements: true } } },
        FrameUpdater: { enabled: true },
        Controls: { Desktop: { showLogo: false } },
        PlayerControls: { Tooltip: { position: "right" } },
        rootNode: document.getElementById("root"),
        parser: reciteParserHtml,
        classname: "recite-root",
      });

      window.Recite.enable();

      toggleLoader(false, () => {
        const closeButton = document.getElementById("recite-close");

        if (closeButton) {
          closeButton.className = `${closeButton.className} show`;
          closeButton.removeAttribute("onclick");
          closeButton.addEventListener("click", closeRecite);
        }
      });
    }
  }, [toggleLoader, closeRecite]);

  useEffect(() => {
    if (accessibility) {
      const script = document.getElementById(reciteScriptId);

      if (script) {
        reciteEnable();
      } else {
        const script = document.createElement("script");

        script.id = reciteScriptId;
        script.src =
          "//api.reciteme.com/asset/js?key=" + process.env.REACT_APP_RECITE_KEY;
        script.async = true;
        script.onload = reciteEnable;

        document.body.appendChild(script);
      }
    } else {
      reciteDisable();
    }
  }, [accessibility]);

  useEffect(() => {
    return () => {
      reciteDisable();
    };
  }, []);

  return (
    <Dimmer active={loading}>
      <Loader>{!accessibility && "Accessibility is loading"}</Loader>
    </Dimmer>
  );
};

ReciteComponent.propTypes = {
  user: PropTypes.object.isRequired,
  updateProfileSuccess: PropTypes.func.isRequired,
};

const ContextRecite = withContext(
  ([{ user }, dispatch]) => ({
    user,
    updateProfileSuccess: (data) => profileUpdateAction(data, dispatch),
  }),
  ReciteComponent
);

export { ContextRecite as Recite };
