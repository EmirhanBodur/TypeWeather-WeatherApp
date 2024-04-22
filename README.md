# Hava Durumu Uygulaması

Bu repo, React Native ve Expo kullanılarak geliştirilen bir hava durumu uygulamasını içermektedir. Kullanıcıların çeşitli şehirler için güncel hava durumu bilgilerini ve tahminlerini kolayca görüntülemeleri amaçlanmıştır.

## Özellikler

- Günlük ve saatlik hava durumu tahminleri.
- Çeşitli şehirler için hava durumu bilgileri.
- Arayüz kullanımı kolay ve görsel olarak çekicidir.

## Kullanılan Teknolojiler

Bu hava durumu uygulaması, aşağıdaki teknolojiler ve kütüphaneler kullanılarak geliştirilmiştir:

- **Expo**: Uygulamaların hızlı bir şekilde geliştirilmesi ve farklı platformlarda kolayca dağıtılmasını sağlayan bir çerçeve.
- **React Native**: iOS ve Android için native uygulamalar geliştirmek için kullanılan JavaScript çerçevesi.
- **React Navigation**: Uygulama içi navigasyon için kullanılan kütüphane. Native-stack ve stack navigatörlerini içerir.
- **Axios**: HTTP istekleri yapmak için kullanılan popüler bir JavaScript kütüphanesi.
- **Lodash**: Veri manipülasyonu ve yardımcı işlevler için kullanılan bir JavaScript kütüphanesi.
- **React Native Paper**: Malzeme tasarımı prensiplerine dayanan çeşitli kullanıcı arayüzü bileşenleri sağlar.
- **React Native Popup Dialog**: Uygulamalarda modal ve dialog pencereleri oluşturmak için kullanılan kütüphane.
- **React Native Progress**: İlerleme çubukları ve dairesel ilerleme göstergeleri gibi görsel bileşenler sunar.
- **React Native Responsive Screen**: Ekran boyutlarına göre responsive tasarım yapmayı kolaylaştıran bir kütüphane.
- **React Native Safe Area Context**: iPhone X gibi cihazlarda güvenli alanı yönetmek için kullanılır.
- **React Native Screens**: Uygulamalar için daha etkili ekran yönetimi sağlar.
- **React Native Gesture Handler**: Uygulamada daha doğal dokunmatik jestlerin kullanılmasını sağlar.
- **React Native Heroicons**: Heroicons koleksiyonundan ikonları React Native projelerinde kullanmak için bir kütüphane.
- **Expo Font, Expo Status Bar, Expo Updates**: Sırasıyla uygulamalarda font yönetimi, durum çubuğu özelleştirmeleri ve otomatik güncellemeler için kullanılır.

### Geliştirme Araçları

- **@babel/core**: JavaScript kodunu ES5'e çevirmek için kullanılan bir derleyici.
- **PostCSS**: CSS'leri işlemek ve dönüştürmek için kullanılan bir araç.


## Kurulum

Bu projeyi yerel ortamınızda kurmak ve çalıştırmak için aşağıdaki adımları takip edin:

### Ön Gereksinimler

Bu uygulamayı kurmadan önce, bilgisayarınıza [Node.js](https://nodejs.org/en/download/) ve [Expo CLI](https://expo.dev/tools#cli) kurulu olduğundan emin olun.

### Kurulum Adımları

1. Projeyi yerel bilgisayarınıza klonlayın:

```bash
git clone https://github.com/EmirhanBodur/TypeWeather-WeatherApp.git
cd TypeWeather-WeatherApp
npm install
expo start