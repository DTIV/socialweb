//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract SocialWeb {
    uint256 public postId;
    constructor(){
        postId = 1;
    }
    struct Post{
        uint256 post_id;
        string comment;
        address from;
        address to;
        uint256 tipAmout;
    }

    mapping(address => Post[]) public userPosts;
    mapping(uint256 => Post[]) public postIdtoPost;
    Post[] public allPosts;

    // postList[msg.sender].push(Post(postId, _comment, msg.sender, _to, _val));


    function createPost(string memory _comment, address _to) public payable {
        Post memory post = Post(postId, _comment, msg.sender, _to, msg.value);
        userPosts[msg.sender].push(post);
        postIdtoPost[postId].push(post);
        allPosts.push(post);
        postId += 1;
    }

    function get(uint index) public view returns(uint, string memory){
        uint256 _id = userPosts[msg.sender][index].post_id;
        string memory _comment = userPosts[msg.sender][index].comment;
        return (_id, _comment);
    }

    function getAllPosts() public view returns(Post [] memory){
        return allPosts;
    }

    function getAllUserPosts() public view returns(Post [] memory){
        return userPosts[msg.sender];
    }

    function getSpecificPost(uint _index) public view returns(Post memory){
        return allPosts[_index];
    }
}