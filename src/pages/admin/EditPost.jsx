import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

import { ArticleDetailSkeleton, ErrorMessage } from "../../components";
import parseJsonToHtml from "../../helper/parseJsonToHtml";
import { getSinglePost, updatePost } from "../../services/index/posts";
import { AiOutlineCamera } from "react-icons/ai";
import { uploded } from "../../constants";
import Editor from "../../components/editor/Editor";

function EditPost() {
	const { slug } = useParams();
	const queryClient = useQueryClient();
	const userState = useSelector((state) => state.user);
	
	// State variables
	const [initialPhoto, setinitialPhoto] = useState(null);
	const [photo, setphoto] = useState(null);
	const [body, setbody] = useState(null);
	const [title, setTitle] = useState('');

	// Fetch the single post
	const { data, isLoading, isError } = useQuery({
		queryFn: () => getSinglePost({ slug }),
		queryKey: ["blog", slug],
	});

	// Set initial values when data is loaded
	useEffect(() => {
		if (!isLoading && !isError) {
			setinitialPhoto(data?.photo);
			setTitle(data?.title || '');
		}
	}, [data, isLoading, isError]);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setphoto(file);
	};

	// Mutation for updating post
	const { mutate: mutateUpdatePost } = useMutation({
		mutationFn: ({ updatedData, slug, token }) => {
			return updatePost({ updatedData, slug, token });
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries(["blog", slug]);
			toast.success("Your post is updated");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	// Update post handler
	const handleUpdatePost = async () => {
		let updatedData = new FormData();

		// Handle photo upload logic (same as before)
		if (!initialPhoto && photo) {
			updatedData.append("postPicture", photo);
		} else if (initialPhoto && !photo) {
			const urlToObject = async (url) => {
				let reponse = await fetch(url);
				let blob = await reponse.blob();
				const file = new File([blob], initialPhoto, {
					type: blob.type,
				});
				return file;
			};

			const picture = await urlToObject(
				uploded.UPLOAD_FOLDER_BASE_URL + data?.photo
			);
			updatedData.append("postPicture", picture);
		}

		// Include title and body in the update
		updatedData.append("document", JSON.stringify({ 
			title, 
			body 
		}));
		
		mutateUpdatePost({
			updatedData,
			slug,
			token: userState.userInfo.token,
		});
	};

	// Delete photo handler
	const handleDeletePhoto = () => {
		if (window.confirm("Do you want to delete your post picture?")) {
			setinitialPhoto(null);
			setphoto(null);
		}
	};

	return (
		<div className="bg-gray-50 min-h-screen py-10">
			{isLoading ? (
				<ArticleDetailSkeleton />
			) : isError ? (
				<ErrorMessage message="Couldn't fetch the post detail" />
			) : (
				<section className="container mx-auto px-5 max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
					<article className="p-6">
						{/* Image Upload Section */}
						<label
							htmlFor="postPicture"
							className="w-full cursor-pointer block mb-6"
						>
							{photo ? (
								<img
									src={URL.createObjectURL(photo)}
									alt="Post"
									className="rounded-xl w-full max-h-[500px] object-cover"
								/>
							) : initialPhoto ? (
								<img
									src={
										uploded.UPLOAD_FOLDER_BASE_URL +
										data?.photo
									}
									alt={data?.title}
									className="rounded-xl w-full max-h-[500px] object-cover"
								/>
							) : (
								<div className="w-full min-h-[300px] flex items-center justify-center bg-blue-50 border-2 border-dashed border-blue-200">
									<AiOutlineCamera className="w-16 h-16 text-blue-500" />
								</div>
							)}
						</label>
						
						<input
							type="file"
							className="sr-only"
							id="postPicture"
							onChange={handleFileChange}
						/>
						
						{/* Button Group */}
						<div className="flex justify-between items-center mb-4">
							<button
								type="button"
								className="text-white bg-red-500 hover:bg-red-600 rounded-lg px-4 py-2 transition duration-300"
								onClick={handleDeletePhoto}
							>
								Delete Image
							</button>
							
							<div className="flex gap-2">
								{data?.categories.map((category) => (
									<Link
										key={category.name}
										to="/blog?category=selectedCategory"
										className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
									>
										{category.name}
									</Link>
								))}
							</div>
						</div>

						{/* Editable Title */}
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full text-2xl font-bold text-gray-800 border-b-2 border-gray-300 focus:border-blue-500 outline-none mb-4 pb-2 bg-white"
							placeholder="Enter post title"
						/>

						{/* Editor Section */}
						<div className="w-full mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
							{!isLoading && !isError && (
								<Editor
									content={data?.body}
									editable={true}
									onDataChange={(data) => setbody(data)}
									className="min-h-[300px] w-full bg-white p-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300"
								/>
							)}
						</div>

						{/* Update Button */}
						<button
							type="button"
							className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.01]"
							onClick={handleUpdatePost}
						>
							Update Post
						</button>
					</article>
				</section>
			)}
		</div>
	);
}

export default EditPost;