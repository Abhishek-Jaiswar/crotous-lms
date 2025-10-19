"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/prisma";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";
import { ApiResponse } from "@/lib/types";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { request } from "@arcjet/next";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    })
  );

export const adminEditCourse = async (
  courseId: string,
  courseData: CourseSchemaType
): Promise<ApiResponse> => {
  const user = await requireAdmin();

  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: user.user.id,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "You have been blocked due to rate limiting.",
        };
      } else {
        return {
          status: "error",
          message:
            "We have detected you as a bot, if this is a mistake please contact support team.",
        };
      }
    }

    const result = courseSchema.safeParse(courseData);
    if (!result.success) {
      return {
        status: "error",
        message: "Invalid data",
      };
    }

    await prisma.course.update({
      where: {
        id: courseId,
        userId: user.user.id,
      },
      data: {
        ...result.data,
      },
    });

    return {
      status: "success",
      message: "Course updated successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to update course",
    };
  }
};
