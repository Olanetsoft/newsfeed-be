const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NewsFeed", function () {
  this.timeout(0);

  let NewsFeed;
  let newsFeedContract;

  before(async () => {
    NewsFeed = await ethers.getContractFactory("NewsFeed");
    newsFeedContract = await NewsFeed.deploy();
  });

  it("should deploy", async () => {
    expect(newsFeedContract.address).to.not.be.null;
  });

  it("should have a default value of 0", async () => {
    const value = await newsFeedContract.getTotalFeeds();
    expect(value.toString()).to.equal("0");
  });

  it("should be able to create feed", async () => {
    const tx = await newsFeedContract.createFeed(
      "Hello World",
      "New York world",
      "New York",
      "Sports",
      "0x123",
      "2022-05-05"
    );
    expect(tx.hash).to.not.be.null;
  });

  it("should be able to get feeds", async () => {
    const tx = await newsFeedContract.createFeed(
      "Hello World",
      "New York world",
      "New York",
      "Sports",
      "0x123",
      "2022-05-05"
    );

    // get feeds
    const feeds = await newsFeedContract.getAllFeeds();
    expect(feeds.length).to.equal(2);
  });

  it("should be able to get feed count", async () => {
    const tx = await newsFeedContract.createFeed(
      "Hello World",
      "New York world",
      "New York",
      "Sports",
      "0x123",
      "2022-05-05"
    );
    const newsCount = await newsFeedContract.getTotalFeeds();
    expect(newsCount.toString()).to.equal("3");
  });

  it("should be able to get feed by id", async () => {
    const tx = await newsFeedContract.createFeed(
      "Hello World",
      "New York world",
      "New York",
      "Sports",
      "0x123",
      "2022-05-05"
    );
    const news = await newsFeedContract.getFeed(2);
    expect(news.title).to.equal("Hello World");
  });
});
