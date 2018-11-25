import { read } from "fs";
import { AnyAaaaRecord } from "dns";


const express = require('express');
const app = express();
const path = require("path");
export class Product {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public desc: string,
        public category: Array<string>,
        public rating: number
    ) { }
}

export class Comment {
    constructor(
        public id: string,
        public productId: number,
        public content: string,
        public time: string,
        public user: string,
        public rating: number
    ) { }
}

const products: Product[] = [
    new Product(
        1,
        "Canno Camera",
        200,
        "Model 4200",
        ["Electronic", "Camera"],
        5
    ),
    new Product(
        2,
        "iPhone",
        599,
        "iPhone X",
        ["Cellphone", "Electronic"],
        4
    ),
    new Product(
        3,
        "Hoverboard",
        139,
        "Hover-1",
        ["Toy"],
        3
    ),
    new Product(
        4,
        "Sony TV",
        300,
        "a 6000",
        ["Camera"],
        5
    ),
    new Product(
        5,
        "Samsung TV",
        399,
        "Nu 6070",
        ["TV"],
        5
    ),
    new Product(
        6,
        "LG TV",
        230,
        "UK 6190",
        ["Electronic", "TV"],
        4
    )
];

const comments: Comment[] = [
    new Comment("1", 1, "Pretty good", "2018-10-10 11:12", "Jay", 3),
    new Comment("2", 2, "Pretty good", "2018-09-10 11:12", "Kelly", 5),
    new Comment("3", 1, "Pretty good", "2018-11-10 11:12", "Jay", 4),
    new Comment("4", 3, "Pretty good", "2018-10-10 11:12", "Keri", 2)
];

app.use("/", express.static(path.join(__dirname, '..', 'client')));
// app.get("/", (req: any, res: any) => {
//     res.send("hello express");
// });

app.get("/api/products", (req: any, res: any) => {
    let param = req.query;
    console.log(param);
    let searchResults = products;
    if (param.title) {
        console.log("hit title");
        searchResults = searchResults.filter((searchResult) => {
            let searchResultName = searchResult.name.toLowerCase();
            return searchResultName.indexOf(param.title.toLowerCase()) !== -1;
        })
    }
    if (param.price && param.price !== "null" && searchResults.length > 0) {
        console.log("hit price");
        searchResults = searchResults.filter((searchResult) => {
            return searchResult.price <= parseInt(param.price);
        })
    }
    if (param.category && param.category !== "-1" && searchResults.length > 0) {
        console.log("hit cate");
        searchResults = searchResults.filter((searchResult) => {
            return searchResult.category.indexOf(param.category) !== -1
        })
    }
    console.log(searchResults);
    res.json(searchResults);
})

app.get("/api/products/:id", (req: any, res: any) => {
    res.json(products.find((product) => {
        return product.id == req.params.id;
    }));
})

app.get("/api/products/:id/comments", (req: any, res: any) => {
    res.json(comments.filter((comment) => {
        return comment.productId == req.params.id;
    }));
})

// app.use('/*', function (req, res) {
//     res.sendfile(__dirname + '../client/index.html');
// });
const server = app.listen("8000", "localhost", () => {
    console.log("start express");
})


