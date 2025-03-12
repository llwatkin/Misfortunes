// Learn more at developers.reddit.com/docs
import { Devvit, useState } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
});

type PageProps = {
  setPage: (page: string) => void;
}

const HomePage = ({ setPage }: PageProps) => (
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
      <button appearance="primary" onPress={() => setPage('create')}>
        Create
      </button>
      <button appearance="primary" onPress={() => setPage('open')}>
        Open
      </button>
    </hstack>
  </vstack>
);

const CreatePage = ({ setPage }: PageProps) => (
  <vstack height="100%" width="100%" gap="medium" alignment="center middle">
    <image
      url="Misfortunes_Icon_Transparent.png"
      description="Icon"
      imageHeight={256}
      imageWidth={256}
      height="48px"
      width="48px"
    />
    <text size="xxlarge">{'Create a Misfortune'}</text>
    <hstack gap="medium">
      <button appearance="primary" onPress={() => setPage('home')}>
        Home
      </button>
    </hstack>
  </vstack>
);

const OpenPage = ({ setPage }: PageProps) => (
<vstack height="100%" width="100%" gap="medium" alignment="center middle">
    <image
      url="Misfortunes_Icon_Transparent.png"
      description="Icon"
      imageHeight={256}
      imageWidth={256}
      height="48px"
      width="48px"
    />
    <text size="xxlarge">{'Open a Misfortune'}</text>
    <hstack gap="medium">
      <button appearance="primary" onPress={() => setPage('home')}>
        Home
      </button>
    </hstack>
  </vstack>
);

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
          <text size="large">Loading...</text>
        </vstack>
      ),
    });
    ui.navigateTo(post);
  },
});

// Add a post type definition
Devvit.addCustomPostType({
  name: 'Misfortunes',
  height: 'regular',
  render: (_context) => {
    //const { useState } = _context;
    const [page, setPage] = useState('home');

    let currentPage;
    switch (page) {
      case 'home':
        currentPage = <HomePage setPage={setPage} />;
        break;
      case 'create':
        currentPage = <CreatePage setPage={setPage} />;
        break;
      case 'open':
        currentPage = <OpenPage setPage={setPage} />;
        break;
      default:
        currentPage = <HomePage setPage={setPage} />;
    }
    
    return (
      <blocks>
        {currentPage}
      </blocks>
    );
  },
});

export default Devvit;
