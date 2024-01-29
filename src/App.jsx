import { useRef, useState } from "react";
import "./App.css";
import WebViewer from "@pdftron/webviewer";
import { useEffect } from "react";

function App() {
  const viewer = useRef(null);
  const [instance, setInstance] = useState(null);
  const [annotPosition, setAnnotPosition] = useState(0);

  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer",
        licenseKey: "demo:1706177616576:7f7e0fed03000000007a10a774910d02b2219ae4844510d527a529b66a",
        initialDoc: "/Carzlane EContract Doc(Filled).pdf",
        disabledElements: [
          "ribbons",
          "toggleNotesButton",
          "searchButton",
          "menuButton",
          "rubberStampToolGroupButton",
          "stampToolGroupButton",
          "fileAttachmentToolGroupButton",
          "calloutToolGroupButton",
          "undo",
          "redo",
          "eraserToolButton",
          "toolsHeader",
          "contextMenuPopup",
        ],
      },
      viewer.current
    ).then((instance) => {
      setInstance(instance);

      const { annotationManager, Annotations } = instance.Core;

      annotationManager.addEventListener("annotationChanged", () => {
        annotationManager.getAnnotationsList().forEach((annot) => {
          if (annot instanceof Annotations.SignatureWidgetAnnotation && annot.annot) {
            annot.annot.NoMove = true;
            annot.annot.NoRotate = true;
            annot.annot.NoResize = true;
            annot.annot.RotationControlEnabled = false;
            annot.annot.disableRotationControl();
          }
        });
      });
      // instance.UI.setToolbarGroup("toolbarGroup-Insert");
      // Disabled the default shortcut for annotation creation

      const normalStyles = (widget) => {
        if (widget instanceof Annotations.SignatureWidgetAnnotation) {
          return {
            border: "1px solid orange",
            backgroundColor: "#FFAF0040",
          };
        }
      };

      annotationManager.addEventListener("annotationChanged", (annotations, action, { imported }) => {
        if (imported && action === "add") {
          annotations.forEach(function (annot) {
            if (annot instanceof Annotations.WidgetAnnotation) {
              Annotations.WidgetAnnotation.getCustomStyles = normalStyles;
              if (
                !(annot instanceof Annotations.SignatureWidgetAnnotation) ||
                annot.fieldName.startsWith("Seller") ||
                annot.fieldName.startsWith("Buyer2") ||
                annot.fieldName.startsWith("Buyer3")
              ) {
                if (annot instanceof Annotations.SignatureWidgetAnnotation) {
                  annot.Hidden = true;
                }
                annot.fieldFlags.set("ReadOnly", true);
              } else {
                annot.fieldFlags.set("Required", true);
                annot.fieldFlags.set("ReadOnly", false);
              }
            }
          });
        }
      });
    });
  }, []);

  const getSignatureFields = () => {
    const { Annotations, annotationManager } = instance.Core;
    let annots = annotationManager.getAnnotationsList();
    const filteredAnnots = annots.filter((annot) => {
      return (
        annot instanceof Annotations.SignatureWidgetAnnotation &&
        annot.fieldName.startsWith("Buyer") &&
        !annot.fieldName.startsWith("Buyer2") &&
        !annot.fieldName.startsWith("Buyer3")
      );
    });

    return filteredAnnots;
  };

  const nextField = () => {
    const { annotationManager } = instance.Core;
    let filteredAnnots = getSignatureFields();

    if (filteredAnnots[annotPosition]) {
      const nextPosition = annotPosition + 1;
      if (filteredAnnots[nextPosition]) {
        setAnnotPosition(nextPosition);
        annotationManager.jumpToAnnotation(filteredAnnots[nextPosition]);
      }
    }
  };

  const prevField = () => {
    const { annotationManager } = instance.Core;
    const filteredAnnots = getSignatureFields();

    if (filteredAnnots[annotPosition]) {
      const prevPosition = annotPosition - 1;
      if (filteredAnnots[prevPosition]) {
        setAnnotPosition(prevPosition);
        annotationManager.jumpToAnnotation(filteredAnnots[prevPosition]);
      }
    }
  };

  const completeSigning = async () => {
    const { documentViewer, annotationManager } = instance.Core;

    if (!annotationManager.getFieldManager().areRequiredFieldsFilled()) {
      alert("Please sign all the required fields");
      return;
    }
    const doc = documentViewer.getDocument();
    const xfdfString = await annotationManager.exportAnnotations({ widgets: false, links: false });
    const options = { xfdfString };
    const data = await doc.getFileData(options);
    const arr = new Uint8Array(data);
    const blob = new Blob([arr], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    console.log(url);
  };

  return (
    <div className="MyComponent">
      <div className="header">React sample</div>
      <button onClick={prevField}>Prev</button>
      <button onClick={nextField}>Next</button>
      <button onClick={completeSigning}>Complete</button>
      <div className="webviewer" ref={viewer} style={{ height: "100vh" }}></div>
    </div>
  );
}

export default App;
