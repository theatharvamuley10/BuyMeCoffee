//SPDX-License-Identifier:MIT
pragma solidity 0.8.30;

contract BuyCoffee {
    error PayMoreEther();
    error WithdrawFailed();

    mapping(address => uint256) coffee;
    address immutable i_owner;

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    constructor() {
        i_owner = msg.sender;
    }

    function buyCoffee() external payable {
        if (msg.value < 1 ether) revert PayMoreEther();
        coffee[msg.sender]++;
    }

    function withdraw() external {
        if (msg.sender == i_owner) {
            (bool sent, ) = msg.sender.call{value: address(this).balance}("");

            if (!sent) revert WithdrawFailed();
        }
    }
}
