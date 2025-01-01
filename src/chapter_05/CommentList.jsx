import React from "react";
import Comment from "./Comment";

const comment = [
    {
        name: "김태우",
        comment: "안녕하세요, 소플입니다.",
    },
    {
        name: "김태우",
        comment: "리액트",
    },
    {
        name: "김태우",
        comment: "리액트 배워보고 싶어요",
    },
]
const CommentList = (props) => {
    return(
        <div>
            {/* <Comment name={"김태우"} comment={"안녕하세요, 소플입니다"} />
            <Comment name={"김태우"} comment={"리액트"} /> */}
            {comment.map((comment) => {
                return(
                  <Comment name={comment.name} comment={comment.comment} />
                    );
                })}
        </div>
    );
}

export default CommentList;