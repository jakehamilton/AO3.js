import {
  Tag,
  getCanonical,
  getTagCategory,
  getTagPage,
  isCanonical,
  isCommon,
} from "./utils/tags";
import { getFeedPage, getTagNameFromFeed } from "./utils/feed";
import { 
  getTagId, 
  getWorksPage,
  WorkData,
} from "./utils/works";
import { 
 User,
 getProfile, 
 getProfileLink, 
 getProfileName, 
 getProfilePseuds,
 getProfileJoined,
 getProfileID,
 getProfileBio,
 getProfileEmail,
 getProfileLocation,
 getProfileBday
} from "./utils/user";

import axios from "axios";
import { setupCache } from "axios-cache-adapter";

axios.defaults.cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

export const getTag = async ({
  tagName,
}: {
  tagName: string;
}): Promise<Tag> => {
  const tagPage = await getTagPage(tagName);
  const worksPage = await getWorksPage(tagName);

  return {
    name: tagName,
    id: getTagId(worksPage),
    category: getTagCategory(tagPage),
    canonical: isCanonical(tagPage),
    common: isCommon(tagPage),
    canonicalName: getCanonical(tagPage),
  };
};

export const getTagNameById = async ({ tagId }: { tagId: string }) => {
  return getTagNameFromFeed(await getFeedPage({ tagId }));
};

export const getUser = async ({
 userName,
}: {
 userName: string;
}): Promise<User> => {

 const profilePage = await getProfile(userName)

 return {
   name: getProfileName(profilePage),
   pseuds: getProfilePseuds(profilePage),
   id: getProfileID(profilePage),
   joined: getProfileJoined(profilePage),
   email: getProfileEmail(profilePage),
   location: getProfileLocation(profilePage),
   birthday: getProfileBday(profilePage),
   url: getProfileLink(userName),
   bioHtml: getProfileBio(profilePage),
 };
};

export const getWorkData = ({
  url,
 }: {
  url: string;
 }): WorkData => {
   
  return {
    workId: url.match(/works\/(\d+)/)[1],
    chapterId: url.match(/chapters\/(\d+)/)?.[1],
    collectionName: url.match(/collections\/(\w+)/)?.[1],
  };
}