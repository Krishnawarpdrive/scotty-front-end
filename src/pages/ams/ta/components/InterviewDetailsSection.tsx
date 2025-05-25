
import React from "react";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";

// Define the interface for interview stage
interface InterviewStage {
  id: number;
  title: string;
  date: string;
  duration: string;
  isActive: boolean;
  isHighlighted: boolean;
  avatarSrc: string;
}

interface InterviewDetailsSectionProps {
  stages: InterviewStage[];
  onAddStage?: (index: number) => void;
  onSelectStage?: (stageId: number) => void;
}

export function InterviewDetailsSection({ 
  stages, 
  onAddStage, 
  onSelectStage 
}: InterviewDetailsSectionProps) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{
        height: "81px",
        width: "100%",
        bgcolor: "white",
        position: "relative",
        overflowX: "auto",
        pb: 1,
      }}
    >
      {stages.map((stage, index) => (
        <Box
          key={stage.id}
          sx={{
            minWidth: 150,
            height: 81,
            bgcolor: stage.isHighlighted ? "#0099330f" : "white",
            borderRadius: 1,
            border: 1,
            borderColor: stage.isHighlighted
              ? "#009933c2"
              : stage.isActive
                ? "#e8e2e2"
                : "#f2f2f2",
            position: "relative",
            cursor: "pointer",
          }}
          onClick={() => onSelectStage && onSelectStage(stage.id)}
        >
          <Typography
            sx={{
              position: "absolute",
              top: 31,
              left: 16,
              fontFamily: "Rubik, sans-serif",
              fontSize: 13,
              color: "#333333",
            }}
          >
            {stage.title}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{ position: "absolute", top: 5, left: 12 }}
          >
            {stage.isActive ? (
              <RadioButtonCheckedIcon sx={{ width: 19, height: 19, color: "#009933" }} />
            ) : (
              <RadioButtonUncheckedIcon sx={{ width: 19, height: 19, color: stage.isHighlighted ? "#009933" : "#ccc" }} />
            )}

            <Stack direction="row" alignItems="center" spacing={0.5}>
              <CalendarTodayIcon
                sx={{ width: 12, height: 12, color: "#999999" }}
              />
              <Typography
                sx={{
                  fontFamily: "Rubik, sans-serif",
                  fontSize: 10,
                  color: "#999999",
                  visibility: stage.date ? "visible" : "hidden",
                }}
              >
                {stage.date || "12 Apr 2025"}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ position: "absolute", top: 55, left: 9 }}
          >
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <AccessTimeIcon
                sx={{ width: 12, height: 12, color: "#808080" }}
              />
              <Typography
                sx={{
                  fontFamily: "Rubik, sans-serif",
                  fontSize: 10,
                  color: "#808080",
                }}
              >
                {stage.duration}
              </Typography>
            </Stack>

            <Avatar
              src={stage.avatarSrc}
              sx={{ width: 16, height: 16 }}
              alt="Interviewer"
            />
          </Stack>

          {index < stages.length - 1 && onAddStage && (
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                top: 29,
                right: -10,
                bgcolor: "white",
                border: 1,
                borderColor: "#eaeaea",
                borderRadius: "19.5px",
                padding: "3px",
                boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.15)",
                zIndex: 10,
                visibility: "hidden",
                "&:hover": {
                  visibility: "visible",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                onAddStage(index);
              }}
            >
              <AddIcon sx={{ width: 16, height: 16 }} />
            </IconButton>
          )}
        </Box>
      ))}

      {onAddStage && (
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 29,
            right: 10,
            bgcolor: "white",
            border: 1,
            borderColor: "#eaeaea",
            borderRadius: "19.5px",
            padding: "3px",
            boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.15)",
          }}
          onClick={() => onAddStage(stages.length - 1)}
        >
          <AddIcon sx={{ width: 16, height: 16 }} />
        </IconButton>
      )}
    </Stack>
  );
}
