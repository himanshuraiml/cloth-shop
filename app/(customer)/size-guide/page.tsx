import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Ruler } from 'lucide-react';

export default function SizeGuidePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Ruler className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Size Guide</h1>
        <p className="text-lg text-gray-600">
          Find your perfect fit with our comprehensive sizing charts
        </p>
      </div>

      <Tabs defaultValue="mens" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="mens">Men's</TabsTrigger>
          <TabsTrigger value="womens">Women's</TabsTrigger>
          <TabsTrigger value="kids">Kids</TabsTrigger>
        </TabsList>

        <TabsContent value="mens">
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Men's Clothing</h2>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shirts & T-Shirts</h3>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Chest (inches)</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Waist (inches)</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Length (inches)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">XS</td>
                        <td className="border border-gray-300 px-4 py-3">34-36</td>
                        <td className="border border-gray-300 px-4 py-3">28-30</td>
                        <td className="border border-gray-300 px-4 py-3">26-27</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">S</td>
                        <td className="border border-gray-300 px-4 py-3">36-38</td>
                        <td className="border border-gray-300 px-4 py-3">30-32</td>
                        <td className="border border-gray-300 px-4 py-3">27-28</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">M</td>
                        <td className="border border-gray-300 px-4 py-3">38-40</td>
                        <td className="border border-gray-300 px-4 py-3">32-34</td>
                        <td className="border border-gray-300 px-4 py-3">28-29</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">L</td>
                        <td className="border border-gray-300 px-4 py-3">40-42</td>
                        <td className="border border-gray-300 px-4 py-3">34-36</td>
                        <td className="border border-gray-300 px-4 py-3">29-30</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">XL</td>
                        <td className="border border-gray-300 px-4 py-3">42-44</td>
                        <td className="border border-gray-300 px-4 py-3">36-38</td>
                        <td className="border border-gray-300 px-4 py-3">30-31</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">XXL</td>
                        <td className="border border-gray-300 px-4 py-3">44-46</td>
                        <td className="border border-gray-300 px-4 py-3">38-40</td>
                        <td className="border border-gray-300 px-4 py-3">31-32</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">Jeans & Trousers</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Waist (inches)</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Hip (inches)</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Inseam (inches)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">28</td>
                        <td className="border border-gray-300 px-4 py-3">28-29</td>
                        <td className="border border-gray-300 px-4 py-3">36-37</td>
                        <td className="border border-gray-300 px-4 py-3">30-32</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">30</td>
                        <td className="border border-gray-300 px-4 py-3">30-31</td>
                        <td className="border border-gray-300 px-4 py-3">38-39</td>
                        <td className="border border-gray-300 px-4 py-3">30-32</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">32</td>
                        <td className="border border-gray-300 px-4 py-3">32-33</td>
                        <td className="border border-gray-300 px-4 py-3">40-41</td>
                        <td className="border border-gray-300 px-4 py-3">30-32</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">34</td>
                        <td className="border border-gray-300 px-4 py-3">34-35</td>
                        <td className="border border-gray-300 px-4 py-3">42-43</td>
                        <td className="border border-gray-300 px-4 py-3">30-32</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">36</td>
                        <td className="border border-gray-300 px-4 py-3">36-37</td>
                        <td className="border border-gray-300 px-4 py-3">44-45</td>
                        <td className="border border-gray-300 px-4 py-3">30-32</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="womens">
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Women's Clothing</h2>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tops & Dresses</h3>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Bust (inches)</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Waist (inches)</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Hip (inches)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">XS</td>
                        <td className="border border-gray-300 px-4 py-3">30-32</td>
                        <td className="border border-gray-300 px-4 py-3">24-26</td>
                        <td className="border border-gray-300 px-4 py-3">34-36</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">S</td>
                        <td className="border border-gray-300 px-4 py-3">32-34</td>
                        <td className="border border-gray-300 px-4 py-3">26-28</td>
                        <td className="border border-gray-300 px-4 py-3">36-38</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">M</td>
                        <td className="border border-gray-300 px-4 py-3">34-36</td>
                        <td className="border border-gray-300 px-4 py-3">28-30</td>
                        <td className="border border-gray-300 px-4 py-3">38-40</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">L</td>
                        <td className="border border-gray-300 px-4 py-3">36-38</td>
                        <td className="border border-gray-300 px-4 py-3">30-32</td>
                        <td className="border border-gray-300 px-4 py-3">40-42</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">XL</td>
                        <td className="border border-gray-300 px-4 py-3">38-40</td>
                        <td className="border border-gray-300 px-4 py-3">32-34</td>
                        <td className="border border-gray-300 px-4 py-3">42-44</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">Jeans & Bottoms</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Waist (inches)</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Hip (inches)</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Inseam (inches)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">26</td>
                        <td className="border border-gray-300 px-4 py-3">26-27</td>
                        <td className="border border-gray-300 px-4 py-3">36-37</td>
                        <td className="border border-gray-300 px-4 py-3">28-30</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">28</td>
                        <td className="border border-gray-300 px-4 py-3">28-29</td>
                        <td className="border border-gray-300 px-4 py-3">38-39</td>
                        <td className="border border-gray-300 px-4 py-3">28-30</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">30</td>
                        <td className="border border-gray-300 px-4 py-3">30-31</td>
                        <td className="border border-gray-300 px-4 py-3">40-41</td>
                        <td className="border border-gray-300 px-4 py-3">28-30</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">32</td>
                        <td className="border border-gray-300 px-4 py-3">32-33</td>
                        <td className="border border-gray-300 px-4 py-3">42-43</td>
                        <td className="border border-gray-300 px-4 py-3">28-30</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="kids">
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Kids Clothing</h2>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">Age-Based Sizing</h3>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Age</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Height (cm)</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Chest (inches)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">2-3Y</td>
                        <td className="border border-gray-300 px-4 py-3">2-3 Years</td>
                        <td className="border border-gray-300 px-4 py-3">92-98</td>
                        <td className="border border-gray-300 px-4 py-3">20-21</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">4-5Y</td>
                        <td className="border border-gray-300 px-4 py-3">4-5 Years</td>
                        <td className="border border-gray-300 px-4 py-3">104-110</td>
                        <td className="border border-gray-300 px-4 py-3">22-23</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">6-7Y</td>
                        <td className="border border-gray-300 px-4 py-3">6-7 Years</td>
                        <td className="border border-gray-300 px-4 py-3">116-122</td>
                        <td className="border border-gray-300 px-4 py-3">24-25</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">8-9Y</td>
                        <td className="border border-gray-300 px-4 py-3">8-9 Years</td>
                        <td className="border border-gray-300 px-4 py-3">128-134</td>
                        <td className="border border-gray-300 px-4 py-3">26-27</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">10-11Y</td>
                        <td className="border border-gray-300 px-4 py-3">10-11 Years</td>
                        <td className="border border-gray-300 px-4 py-3">140-146</td>
                        <td className="border border-gray-300 px-4 py-3">28-29</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">Baby Sizing (0-24 Months)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Age</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Height (cm)</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Weight (kg)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">0-3M</td>
                        <td className="border border-gray-300 px-4 py-3">0-3 Months</td>
                        <td className="border border-gray-300 px-4 py-3">56-62</td>
                        <td className="border border-gray-300 px-4 py-3">3-6</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">3-6M</td>
                        <td className="border border-gray-300 px-4 py-3">3-6 Months</td>
                        <td className="border border-gray-300 px-4 py-3">62-68</td>
                        <td className="border border-gray-300 px-4 py-3">6-8</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">6-9M</td>
                        <td className="border border-gray-300 px-4 py-3">6-9 Months</td>
                        <td className="border border-gray-300 px-4 py-3">68-74</td>
                        <td className="border border-gray-300 px-4 py-3">8-9</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">9-12M</td>
                        <td className="border border-gray-300 px-4 py-3">9-12 Months</td>
                        <td className="border border-gray-300 px-4 py-3">74-80</td>
                        <td className="border border-gray-300 px-4 py-3">9-11</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3">12-18M</td>
                        <td className="border border-gray-300 px-4 py-3">12-18 Months</td>
                        <td className="border border-gray-300 px-4 py-3">80-86</td>
                        <td className="border border-gray-300 px-4 py-3">11-13</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 bg-blue-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Measure</h2>
        <div className="grid md:grid-cols-3 gap-6 text-gray-700">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Chest/Bust</h3>
            <p className="text-sm">Measure around the fullest part of your chest, keeping the tape measure horizontal.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Waist</h3>
            <p className="text-sm">Measure around your natural waistline, keeping the tape comfortably loose.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Hip</h3>
            <p className="text-sm">Measure around the fullest part of your hips, about 8 inches below your waist.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
