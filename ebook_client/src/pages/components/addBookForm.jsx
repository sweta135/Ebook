// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function AddBookForm({ categories }) {
//   const { bookId } = useParams();

//   console.log(bookId);

//   const [title, setTitle] = useState(
//     Object.keys(bookToEdit).length ? bookToEdit.title : ""
//   );
//   const [price, setPrice] = useState(
//     Object.keys(bookToEdit).length ? bookToEdit.price : ""
//   );
//   const [pages, setPages] = useState(
//     Object.keys(bookToEdit).length ? bookToEdit.pages : ""
//   );
//   const [category, setCategory] = useState(
//     Object.keys(bookToEdit).length
//       ? bookToEdit.category._id
//       : "667fd643893b2270dee2c191"
//   );
//   const [author, setAuthor] = useState(
//     Object.keys(bookToEdit).length ? bookToEdit.author.fullname : ""
//   );
//   const [quantity, setQuantity] = useState(
//     Object.keys(bookToEdit).length ? bookToEdit.quantity : 0
//   );
//   const [image, setImage] = useState(
//     Object.keys(bookToEdit).length ? bookToEdit.image : ""
//   );

//   const [bookToEdit, setBookToEdit] = useState({});

//   useEffect(() => {
//     async function getBookToEdit() {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/book/${bookId}`
//         );

//         if (response.data.success) {
//           setBookToEdit(response.data.book);
//         } else {
//           toast.error(response.data.message);
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to fetch book");
//       }
//     }
//     if (bookId) {
//       getBookToEdit();
//     }
//   }, []);

//   const [description, setDescription] = useState("");

//   async function handleBookAdd(event) {
//     event.preventDefault();

//     if (
//       title.trim() === "" ||
//       price.trim() === "" ||
//       pages.trim() === "" ||
//       category.trim() === "" ||
//       author.trim() === "" ||
//       quantity.trim() === "" ||
//       image.trim() === "" ||
//       description.trim === ""
//     ) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/book",
//         {
//           title,
//           price,
//           pages,
//           category,
//           author,
//           quantity,
//           image,
//           description,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         console.log(response.data);
//         toast(response.data.message);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (err) {
//       alert("book server err");
//       console.error(err);
//     }
//   }

//   async function handleEdit(event) {
//     event.preventDefault();
//     if (
//       title.trim() === "" ||
//       price.trim() === "" ||
//       pages.trim() === "" ||
//       category.trim() === "" ||
//       author.trim() === "" ||
//       quantity.trim() === "" ||
//       image.trim() === "" ||
//       description.trim === ""
//     ) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     try {
//       const response = await axios.patch(
//         `http://localhost:3000/book/${bookId}`,
//         {
//           title,
//           price,
//           pages,
//           category,
//           author,
//           quantity,
//           image,
//           description,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         console.log(response.data);
//         toast(response.data.message);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (err) {
//       alert("book server err");
//       console.error(err);
//     }
//   }

//   return (
//     <div className="rside">
//       <form
//         id="registerForm"
//         className="form"
//         onSubmit={bookId ? handleEdit : handleBookAdd}
//       >
//         <h1>Add Book</h1>

//         <label htmlFor="title">Book Title</label>
//         <input
//           type="text"
//           name="title"
//           id="title"
//           placeholder="Game Of Thrones"
//           onChange={(e) => setTitle(e.target.value)}
//           value={title}
//           required
//         />

//         <label htmlFor="image">Book Image URL</label>
//         <input
//           type="text"
//           name="image"
//           id="image"
//           placeholder="http://"
//           onChange={(e) => setImage(e.target.value)}
//           value={image}
//           required
//         />

//         <label htmlFor="price">Price</label>
//         <input
//           type="number"
//           name="price"
//           id="price"
//           placeholder="19.99"
//           onChange={(e) => setPrice(e.target.value)}
//           value={price}
//           required
//         />

//         <label htmlFor="pages">Pages</label>
//         <input
//           type="number"
//           name="pages"
//           id="pages"
//           placeholder="835"
//           onChange={(e) => setPages(e.target.value)}
//           value={pages}
//           required
//         />

//         <label htmlFor="category">Category</label>
//         <select
//           name="category"
//           id="category"
//           onChange={(e) => setCategory(e.target.value)}
//           value={category}
//           required
//         >
//           {categories.map((category, index) => (
//             <option value={category._id} key={index}>
//               {category.genreName}
//             </option>
//           ))}
//         </select>

//         <label htmlFor="author">Author</label>
//         <input
//           type="text"
//           name="author"
//           id="author"
//           placeholder="Author ID"
//           onChange={(e) => setAuthor(e.target.value)}
//           value={author}
//         />
//         <label htmlFor="author">Description</label>
//         <input
//           type="text"
//           name="description"
//           id="description"
//           placeholder="description"
//           onChange={(e) => setDescription(e.target.value)}
//           value={description}
//         />

//         <label htmlFor="quantity">Quantity</label>
//         <input
//           type="number"
//           name="quantity"
//           id="quantity"
//           placeholder="0"
//           onChange={(e) => setQuantity(e.target.value)}
//           value={quantity}
//         />

//         <button type="submit">{bookId ? "Edit Book" : "Add Book"}</button>
//       </form>
//     </div>
//   );
// }

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddBookForm({ categories }) {
  const { bookId } = useParams();

  const [bookToEdit, setBookToEdit] = useState({});

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [pages, setPages] = useState("");
  const [category, setCategory] = useState("667fd643893b2270dee2c191");
  const [author, setAuthor] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function getBookToEdit() {
      try {
        const response = await axios.get(
          `http://localhost:3000/book/${bookId}`
        );

        if (response.data.success) {
          setBookToEdit(response.data.book);
          setTitle(response.data.book.title);
          setPrice(response.data.book.price.toString());
          setPages(response.data.book.pages);
          setCategory(response.data.book.category._id);
          setAuthor(response.data.book.author.fullname);
          setQuantity(response.data.book.quantity);
          setImage(response.data.book.image);
          setDescription(response.data.book.description);
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch book");
      }
    }
    if (bookId) {
      getBookToEdit();
    }
  }, [bookId]);

  async function handleBookAdd(event) {
    event.preventDefault();

    if (
      title.trim() === "" ||
      price.trim() === "" ||
      category.trim() === "" ||
      author.trim() === "" ||
      image.trim() === "" ||
      description.trim() === "" ||
      !pages ||
      !quantity
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/book",
        {
          title,
          price,
          pages,
          category,
          author,
          quantity,
          image,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        console.log(response.data);
        toast(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      alert("book server err");
      console.error(err);
    }
  }

  async function handleEdit(event) {
    event.preventDefault();
    if (
      title.trim() === "" ||
      price.trim() === "" ||
      category.trim() === "" ||
      author.trim() === "" ||
      image.trim() === "" ||
      description.trim() === "" ||
      !pages ||
      !quantity
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/book/${bookId}`,
        {
          title,
          price,
          pages,
          category,
          author,
          quantity,
          image,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        console.log(response.data);
        toast(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      alert("book server err");
      console.error(err);
    }
  }

  return (
    <div className="rside">
      <form
        id="registerForm"
        className="form"
        onSubmit={bookId ? handleEdit : handleBookAdd}
      >
        <h1>{bookId ? "Edit Book" : "Add Book"}</h1>

        <label htmlFor="title">Book Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Game Of Thrones"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />

        <label htmlFor="image">Book Image URL</label>
        <input
          type="text"
          name="image"
          id="image"
          placeholder="http://"
          onChange={(e) => setImage(e.target.value)}
          value={image}
          required
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="19.99"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          required
        />

        <label htmlFor="pages">Pages</label>
        <input
          type="number"
          name="pages"
          id="pages"
          placeholder="835"
          onChange={(e) => setPages(e.target.value)}
          value={pages}
          required
        />

        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          required
        >
          {categories.map((category, index) => (
            <option value={category._id} key={index}>
              {category.genreName}
            </option>
          ))}
        </select>

        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          id="author"
          placeholder="Author ID"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
          required
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />

        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          placeholder="0"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
          required
        />

        <button type="submit">{bookId ? "Edit Book" : "Add Book"}</button>
      </form>
    </div>
  );
}
