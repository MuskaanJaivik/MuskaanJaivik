// Creates a Zend_Gdata_Photos_AlbumQuery
$query = $gp->newAlbumQuery();

$query->setUser("default");
$query->setAlbumName("sample.albumname");

$albumFeed = $gp->getAlbumFeed($query);
foreach ($albumFeed as $albumEntry) {
    echo $albumEntry->title->text . "<br />\n";
}