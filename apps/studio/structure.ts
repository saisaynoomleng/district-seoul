import {StructureResolver} from 'sanity/structure'

import {IoMdChatboxes, IoMdSettings} from 'react-icons/io'
import {IoNewspaper, IoPencil, IoStorefront} from 'react-icons/io5'
import {TbCategoryFilled} from 'react-icons/tb'
import {RiCustomSize, RiPagesFill} from 'react-icons/ri'
import {FaUsersCog} from 'react-icons/fa'
import {GiSkateboard, GiStairsGoal} from 'react-icons/gi'
import {SiNike} from 'react-icons/si'
import {VscCollection} from 'react-icons/vsc'
import {PiFlagBannerFoldFill} from 'react-icons/pi'
import {GrWorkshop} from 'react-icons/gr'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('District Seoul')
    .items([
      S.divider().title('Operations'),
      S.documentTypeListItem('siteSetting').title('Site Setting').icon(IoMdSettings),
      S.documentTypeListItem('faqs').title('FAQs').icon(IoMdChatboxes),
      S.documentTypeListItem('teamMember').title('Team Members').icon(FaUsersCog),
      S.documentTypeListItem('milestone').title('Milestones').icon(GiStairsGoal),
      S.documentTypeListItem('store').title('Stores').icon(IoStorefront),

      S.divider().title('Products'),
      S.documentTypeListItem('product').title('All Products').icon(GiSkateboard),
      S.documentTypeListItem('productVariant').title('Product Variants').icon(GiSkateboard),
      S.documentTypeListItem('collection').title('Collections').icon(VscCollection),
      S.documentTypeListItem('shopTheLook').title('Shop The Looks').icon(GrWorkshop),
      S.documentTypeListItem('brand').title('Brands').icon(SiNike),
      S.documentTypeListItem('productCategory').title('Product Categories').icon(TbCategoryFilled),
      S.documentTypeListItem('sizeChart').title('Size Charts').icon(RiCustomSize),

      S.divider().title('Marketing'),
      S.documentTypeListItem('author').title('Authors').icon(IoPencil),
      S.documentTypeListItem('blogCategory').title('Blog Categories').icon(TbCategoryFilled),
      S.documentTypeListItem('blog').title('Blogs').icon(IoNewspaper),
      S.documentTypeListItem('heroBanner').title('Marketing Banners').icon(PiFlagBannerFoldFill),

      S.divider().title('Pages'),
      S.documentTypeListItem('utilityPage').title('Utility Pages').icon(RiPagesFill),
    ])
