// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Musical is ERC721URIStorage, Ownable {
    uint256 private tokenId;

    constructor(string memory collectionName, string memory collectionSymbol)
        Ownable(msg.sender)
        ERC721(collectionName, collectionSymbol)
    {}

    function mintNFT(address recipient, string memory tokenURI) public {
        require(balanceOf(recipient)<1,"YOU_ALREADY_MINTED");
        unchecked {
            tokenId++;
        }
        uint256 newItemId = tokenId;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
    }
}