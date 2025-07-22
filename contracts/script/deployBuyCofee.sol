//SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Script} from "lib/forge-std/src/Script.sol";
import {BuyCoffee} from "src/buyCoffee.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast();
        new BuyCoffee();
        vm.stopBroadcast();
    }
}
