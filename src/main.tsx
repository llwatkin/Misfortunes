// Learn more at developers.reddit.com/docs
import { Devvit, useState } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
});

// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: 'Add my post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    ui.showToast("Submitting your post - upon completion you'll navigate there.");

    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: 'Today\'s Misfortunes',
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.navigateTo(post);
  },
});

// Add a post type definition
Devvit.addCustomPostType({
  name: 'Experience Post',
  height: 'regular',
  render: (_context) => {
    return (
      <vstack height="100%" width="100%" gap="medium" alignment="center middle">
        <image
          url="Misfortunes_Icon_Transparent.png"
          description="Icon"
          imageHeight={256}
          imageWidth={256}
          height="48px"
          width="48px"
        />
        <text size="xxlarge">{'Misfortunes'}</text>
        <hstack gap="medium">
          <button appearance="primary">
            Create
          </button>
          <button appearance="primary">
            Open
          </button>
        </hstack>
      </vstack>
    );
  },
});

export default Devvit;
