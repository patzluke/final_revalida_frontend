import { Component } from '@angular/core';

@Component({
  selector: 'app-crop-advertisements',
  templateUrl: './crop-advertisements.component.html',
  styleUrls: ['./crop-advertisements.component.scss']
})
export class CropAdvertisementsComponent {

  posts: {
    postId: number,
    crop_specialization_id: number,
    crop_name: string,
    crop_description: string,
    crop_image: string,
    quantity: number
  }[] = [
      {
        postId: 1,
        crop_specialization_id: 1,
        crop_name: 'Potato',
        crop_description: 'Planting seed potatoes at the right time is important. Seed potatoes growing in soil that is too cold and wet may rot while potatoes that grow in soil that is too warm, may not produce well. It is best to plant seed potatoes after the chance of hard frost has past, but while you are still experiencing light frosts. If you are concerned that the weather may get too warm or too cold too fast in your area, you can try chitting your seed potatoes to help get a jump on the season. Plant the seed potatoes about 2-3 inches deep and about 24 inches apart. Light frost may kill any new growth above the soil line once they sprout, but do not panic. This will not kill the potatoes plant and the potatoes will regrow their foliage quickly. Now that you know these few tips on cutting and planting seed potatoes, you can look forward to a successful potato harvest.',
        crop_image: 'https://plantix.net/en/library/assets/custom/crop-images/potato.jpeg',
        quantity: 50
      },
      {
        postId: 2,
        crop_specialization_id: 1,
        crop_name: 'Oats',
        crop_description: 'oats, (Avena sativa), domesticated cereal grass (family Poaceae) grown primarily for its edible starchy grains. Oats are widely cultivated in the temperate regions of the world and are second only to rye in their ability to survive in poor soils. Although oats are used chiefly as livestock feed, some are processed for human consumption, especially as breakfast foods. The plants provide good hay and, under proper conditions, furnish excellent grazing and make good silage (stalk feed preserved by fermentation).',
        crop_image: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQB1CaDUrJR3_r7VuJUJlz14b_eUB2NVApNtmEALhJyU5sdnh6QHDUn1OO6Tnb7-ioF3zL5SE-Qai851bo',
        quantity: 50
      },
      {
        postId: 3,
        crop_specialization_id: 1,
        crop_name: 'Corn',
        crop_description: "Corn has several health benefits. Because of the high fiber content, it can aid with digestion. It also contains valuable B vitamins, which are important to your overall health. Corn also provides our bodies with essential minerals such as zinc, magnesium, copper, iron and manganese.",
        crop_image: 'https://bonnieplants.com/cdn/shop/articles/BONNIE-PLANTS_corn-iStock-857670630-2400px_1ce4b5df-20b7-433c-acde-8703235c66be.jpg?v=1642542000&width=1000',
        quantity: 50
      },
      {
        postId: 4,
        crop_specialization_id: 1,
        crop_name: 'Melon',
        crop_description: 'melon, (Cucumis melo), trailing vine in the gourd family (Cucurbitaceae), grown for its often musky-scented edible fruit. The melon plant is native to central Asia, and its many cultivated varieties are widely grown in warm regions around the world.',
        crop_image: 'https://modernfarmer.com/wp-content/uploads/2018/07/8-tips-for-sweet-melons-1200x797.jpg',
        quantity: 50
      },
    ]
}