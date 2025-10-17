// src/components/shared/SketchCanvasComponent.tsx
"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";
import { Button } from "@/components/ui";
import { Undo2, Redo2, Eraser, Download, Brush, X } from "lucide-react";

interface SketchPoint {
  x: number;
  y: number;
  pressure?: number;
}

interface SketchPath {
  drawMode: "path" | "erase";
  strokeColor: string;
  strokeWidth: number;
  paths: SketchPoint[];
}

interface SketchData {
  paths: SketchPath[];
  imageData?: string;
}

interface SketchInitialState {
  paths: SketchPath[];
}

interface SketchCanvasComponentProps {
  initialState?: SketchInitialState;
  onStateChange?: (data: SketchData) => void;
  canvasWidth?: string;
  canvasHeight?: string;
  readOnly?: boolean;
  strokeColor?: string;
  eraseModeColor?: string;
  isLoading?: boolean;
}

export const SketchCanvasComponent: React.FC<SketchCanvasComponentProps> = ({
  initialState,
  // onStateChange,
  canvasWidth = "100%",
  canvasHeight = "400px",
  readOnly = false,
  strokeColor = "#4a4a4a",
  // eraseModeColor = "#FFFFFF",
  isLoading = false,
}) => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const [isEraseMode, setIsEraseMode] = useState(false);

  const [, setCurrentCanvasPaths] = useState<SketchPath[]>(
    []
  );

  // const handleReactSketchCanvasPathsChange = useCallback(
  //   (paths: SketchPath[]) => {
  //     setCurrentCanvasPaths(paths);

  //     if (onStateChange) {
  //       canvasRef.current
  //         ?.exportImage("png")
  //         .then((imageData) => {
  //           onStateChange({ paths, imageData });
  //         })
  //         .catch((error) => {
  //           console.error("Failed to export image:", error);
  //           onStateChange({ paths });
  //         });
  //     }
  //   },
  //   [onStateChange]
  // );

  useEffect(() => {
    if (initialState && canvasRef.current) {
      try {
        const canvasPaths = initialState.paths.map((sketchPath) => ({
          ...sketchPath,
          drawMode: sketchPath.drawMode === "erase",
        }));
        canvasRef.current.loadPaths(canvasPaths);
        setCurrentCanvasPaths(initialState.paths);
      } catch (error) {
        console.error("Failed to load initial paths:", error);
      }
    } else if (canvasRef.current && !initialState) {
      canvasRef.current.clearCanvas();
      setCurrentCanvasPaths([]);
      canvasRef.current.clearCanvas();
      setCurrentCanvasPaths([]);
    }
  }, []);

  const handleUndo = useCallback(() => {
    canvasRef.current?.undo();
  }, []);

  const handleRedo = useCallback(() => {
    canvasRef.current?.redo();
  }, []);

  const handleClear = useCallback(() => {
    canvasRef.current?.clearCanvas();
  }, []);

  const toggleEraseMode = useCallback(() => {
    setIsEraseMode((prev) => {
      const newEraseMode = !prev;
      if (canvasRef.current) {
        canvasRef.current.eraseMode(newEraseMode);
      }
      return newEraseMode;
    });
  }, []);

  const getGridSvg = useCallback(() => {
    const svgWidth = 100;
    const svgHeight = 100;
    const lines = [];

    // --- Parameters for Vertical Lines (as seen in the image) ---
    const gridSizeVerticalBold = 16.67; // Approximately 6 prominent vertical lines (100 / 6)
    const boldLineColor = "#b0b0b0"; // Darker color for prominent lines
    const boldLineWidth = 1; // Thicker prominent lines

    const gridSizeVerticalLight = gridSizeVerticalBold / 4; // 3 lighter lines between each bold line
    const lightLineColor = "#e0e0e0"; // Lighter color for faint lines
    const lightLineWidth = 0.5; // Thinner faint lines
    const dottedLineDashArray = "1 2"; // For dotted effect on faint vertical lines

    // --- Parameters for Horizontal Lines (as seen in the image) ---
    // These create the distinct rows. Adjust gridSizeHorizontal for more/fewer rows.
    const gridSizeHorizontal = 8.33; // For consistent, relatively dense horizontal lines
    const horizontalLineColor = "#e0e0e0"; // Uniform light color for horizontal lines
    const horizontalLineWidth = 0.5; // Thin horizontal lines

    // 1. Draw Prominent Vertical Lines
    for (let i = 0; i <= svgWidth / gridSizeVerticalBold; i++) {
      lines.push(
        <line
          key={`v-bold-${i}`}
          x1={i * gridSizeVerticalBold}
          y1="0"
          x2={i * gridSizeVerticalBold}
          y2="100"
          stroke={boldLineColor}
          strokeWidth={boldLineWidth}
        />
      );
    }

    // 2. Draw Lighter, Dotted Vertical Lines (between the prominent ones)
    for (let i = 0; i < svgWidth / gridSizeVerticalBold; i++) {
      for (let j = 1; j < 4; j++) {
        // Loop 3 times for 3 dotted lines between bold ones
        const xPosition = i * gridSizeVerticalBold + j * gridSizeVerticalLight;
        if (xPosition < svgWidth) {
          // Ensure lines don't go past the SVG boundary
          lines.push(
            <line
              key={`v-light-${i}-${j}`}
              x1={xPosition}
              y1="0"
              x2={xPosition}
              y2="100"
              stroke={lightLineColor}
              strokeWidth={lightLineWidth}
              strokeDasharray={dottedLineDashArray} // Apply dotted effect
            />
          );
        }
      }
    }

    // 3. Draw Horizontal Lines
    for (let i = 0; i <= svgHeight / gridSizeHorizontal; i++) {
      lines.push(
        <line
          key={`h-${i}`}
          x1="0"
          y1={i * gridSizeHorizontal}
          x2="100"
          y2={i * gridSizeHorizontal}
          stroke={horizontalLineColor}
          strokeWidth={horizontalLineWidth}
        />
      );
    }

    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {lines}
      </svg>
    );
  }, []); // Dependencies remain empty as values are constant

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm bg-white">
      {!readOnly && (
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          <Button
            onClick={handleUndo}
            disabled={isLoading}
            variant="outline"
            size="icon"
            title="เลิกทำ (Undo)"
            type="button"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleRedo}
            disabled={isLoading}
            variant="outline"
            size="icon"
            title="ทำซ้ำ (Redo)"
            type="button"
          >
            <Redo2 className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleClear}
            disabled={isLoading}
            variant="outline"
            size="icon"
            title="ล้างทั้งหมด (Clear)"
            type="button"
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            onClick={toggleEraseMode}
            disabled={isLoading}
            variant={isEraseMode ? "default" : "outline"}
            size="icon"
            title={isEraseMode ? "โหมดปากกา (Pen Mode)" : "โหมดลบ (Erase Mode)"}
            type="button"
          >
            {isEraseMode ? (
              <Brush className="h-4 w-4" />
            ) : (
              <Eraser className="h-4 w-4" />
            )}
          </Button>
          <Button
            onClick={async () => {
              if (canvasRef.current) {
                const imageData = await canvasRef.current.exportImage("png");
                const a = document.createElement("a");
                a.href = imageData;
                a.download = "sketch-drawing.png";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }
            }}
            // Download button disabled if loading or if there are no paths (canUndo is false)
            disabled={isLoading}
            variant="outline"
            size="icon"
            title="ดาวน์โหลดรูปภาพ (Download Image)"
            type="button"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Canvas Container with Grid Background */}
      <div
        style={{
          width: canvasWidth,
          height: canvasHeight,
          position: "relative",
          background: "#FFFFFF",
          borderRadius: "0.5rem",
          overflow: "hidden",
          border: "1px solid #e0e0e0",
        }}
      >
        {getGridSvg()}

        <ReactSketchCanvas
          ref={canvasRef}
          strokeWidth={4}
          strokeColor={strokeColor}
          eraserWidth={10}
          canvasColor="#FFFFFF00"
          className="relative z-10"
        />
      </div>
    </div>
  );
};
