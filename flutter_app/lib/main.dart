import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const AyoBangunApp());
}

class AyoBangunApp extends StatelessWidget {
  const AyoBangunApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ayo Bangun.ID Contractor',
      home: Scaffold(
        appBar: AppBar(title: const Text('Ayo Bangun.ID Contractor')),
        body: const Center(child: Text('Construction Management System')),
      ),
    );
  }
}
