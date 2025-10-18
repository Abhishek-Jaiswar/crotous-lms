'use client'

import { Button } from "@/components/ui/button";
import {
    courseCategories,
    courseLevels,
    courseStatus,
    courseSchema,
    CourseSchemaType,
} from "@/lib/zodSchema";
import { Loader, PlusIcon, SparkleIcon } from "lucide-react";
import React, { useTransition } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import slugify from "slugify";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import RichTextEditor from "@/components/rich-text-editor/Editor";
import Uploader from "@/components/file-uploader/Uploader";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { adminEditCourse } from "../action";
import { AdminCourseSingleType } from "@/app/data/admin/admin-get-course";

interface iAppProps {
    data: AdminCourseSingleType
}

export const EditCourseForm = ({ data }: iAppProps) => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm<CourseSchemaType>({
        resolver: zodResolver(courseSchema) as Resolver<CourseSchemaType>,
        defaultValues: {
            title: data.title,
            description: data.description,
            fileKey: data.fileKey,
            price: data.price,
            duration: data.duration,
            level: data.level,
            category: data.category as CourseSchemaType['category'],
            status: data.status,
            slug: data.slug,
            smallDescription: data.smallDescription,
        },
    });

    const onSubmit = (values: CourseSchemaType) => {
        startTransition(async () => {
            const { data: result, error } = await tryCatch(adminEditCourse(data.id, values))

            if (error) {
                toast.error("An expected error occured.");
                return
            }

            if (result.status === 'success') {
                toast.success(result.message)
                form.reset()
                router.push('/admin/courses')
            } else if (result.status === 'error') {
                toast.error(result.message)
            }
        })
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>

                <div className="flex items-end gap-4">
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <Input placeholder="Slug" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="button"
                        className="w-fit"
                        onClick={() => {
                            const titleValue = form.getValues("title");
                            const slug = slugify(titleValue);

                            form.setValue("slug", slug, { shouldValidate: true });
                        }}
                    >
                        <SparkleIcon className="ml-1" size={16} />
                        Generate Slug
                    </Button>
                </div>

                {/* Small Description */}
                <FormField
                    control={form.control}
                    name="smallDescription"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Small Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="min-h-[120px]"
                                    placeholder="Small Description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <RichTextEditor field={field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="fileKey"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Thumbnail Image</FormLabel>
                            <FormControl>
                                <Uploader value={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price in (₹)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Price" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Duration (hours)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Duration"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Select Category</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {courseCategories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Level</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Level" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {courseLevels.map((lvl) => (
                                            <SelectItem key={lvl} value={lvl}>
                                                {lvl}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Status</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {courseStatus.map((st) => (
                                            <SelectItem key={st} value={st}>
                                                {st}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader className="size-3 animate-spin ml-1" />
                                Updating...
                            </>
                        ) : (
                            <>
                                Update Course
                                <PlusIcon className="ml-1" size={16} />
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}