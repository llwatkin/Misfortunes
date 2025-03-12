import type { MenuItem } from '@devvit/public-api';
import { Devvit } from '@devvit/public-api';

export const installApp: MenuItem = {
  label: '[Misfortunes] Install app',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { ui, reddit } = context;
    const community = await reddit.getCurrentSubreddit();

    // Create a pinned post
    const post = await reddit.submitPost({
      title: 'Today\'s Misfortunes',
      subredditName: community.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading...</text>
        </vstack>
      ),
    });

    await Promise.all([
      // Pin the post
      post.sticky()
    ]);

    ui.navigateTo(post);
    ui.showToast('Installed Misfortunes!');
  },
};